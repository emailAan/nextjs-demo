import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import { Provider } from 'react-redux'

import getPageContext from '../utils/getPageContext'
import {LOGIN_URL} from '../utils/routes'
import redirect from '../utils/redirect'
import withRedux from 'next-redux-wrapper'
import {initializeStore} from '../stores/store'
import { refreshJwt, refreshJwtOnServer } from '../utils/auth'
import {isAuthenticated} from '../containers/main/selectors'
import {setAuthentication} from '../containers/main/actions'
import cookie from 'cookie'
import {ApiProvider, getApiContext} from '../components/api-context'

require('es6-promise').polyfill()
require('isomorphic-fetch')

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
*/
const makeStore = (initialState, options) => {
  return initializeStore(initialState)
}

class AvintyApp extends App {
  constructor (props) {
    super(props)
    this.pageContext = getPageContext()
  }

  pageContext = null;

  static async getInitialProps ({ Component, ctx, url, router }) {
    const onLoginPage = ctx.pathname === LOGIN_URL

    let authenticated = await AvintyApp.checkAndRefreshToken(ctx, router)

    if (onLoginPage && authenticated) {
      const redirectUrl = ctx.query.url || '/'
      redirect(redirectUrl, ctx)
    }

    if (!onLoginPage && !authenticated) {
      const redirectUrl = `${LOGIN_URL}?url=${router.asPath}`
      redirect(redirectUrl, ctx)
    }

    const apiCtx = getApiContext(ctx.store)
    ctx.apiCtx = apiCtx
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }
  }

  static async checkAndRefreshToken (ctx) {
    // Check if we already confirmed that we are authenticated.
    if (isAuthenticated(ctx.store.getState())) {
      return true
    }

    // Let's ask for a fresh JWT token
    const res = await AvintyApp.refreshJwtToken(ctx)

    // Save the result of the renewal of the JWT
    ctx.store.dispatch(setAuthentication({ authenticated: res.auth, authData: res }))

    return res.auth
  }

  static getRefreshTokenFromCookie ({headers}) {
    return (!headers || !headers.cookie)
      ? null
      : cookie.parse(headers.cookie).refreshToken
  }

  static async refreshJwtToken ({isServer, req}) {
    return isServer
      ? refreshJwtOnServer(AvintyApp.getRefreshTokenFromCookie(req))
      : refreshJwt()
  }

  sessionExpiredTimeout = null

  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    this.setTimeoutSessionExpired()
  }

  componentWillUnmount () {
    clearTimeout(this.sessionExpiredTimeout)
  }

  async setTimeoutSessionExpired () {
    // No need to check on the login page ;)
    if (this.props.router.route !== LOGIN_URL) {
      const res = await refreshJwt()

      // Save the result of the renewal of the JWT
      this.props.store.dispatch(setAuthentication({ authenticated: res.auth, authData: res }))

      // It seems the session has expired, so redirect to the login page
      if (!res.auth) { redirect(LOGIN_URL, {}) }
    }

    const timeout = 900 /* jwt lifetime in seconds */ / 2 * 1000
    this.sessionExpiredTimeout = setTimeout(this.setTimeoutSessionExpired.bind(this), timeout)
  }

  render () {
    const { Component, pageProps, store } = this.props

    const apiCtx = getApiContext(store)
    return (
      <Container>
        <Provider
          store={store}>
          <ApiProvider value={apiCtx}>
            <JssProvider
              registry={this.pageContext.sheetsRegistry}
              generateClassName={this.pageContext.generateClassName}>
              <MuiThemeProvider
                theme={this.pageContext.theme}
                sheetsManager={this.pageContext.sheetsManager}>
                <CssBaseline />
                <Component
                  pageContext={this.pageContext}
                  apiCtx={apiCtx}
                  {...pageProps} />
              </MuiThemeProvider>
            </JssProvider>
          </ApiProvider>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(AvintyApp)
