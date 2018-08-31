import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import { Provider } from 'react-redux'

import getPageContext from '../utils/getPageContext'
import {LOGIN_URL} from '../utils/routes'
import withRedux from 'next-redux-wrapper'
import {initializeStore} from '../stores/store'
import { redirectIfNotAuthenticated, redirectIfAuthenticated, verifyJwt } from '../utils/auth'
import { SET_AUTHENTICATED } from '../containers/main/constants'

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

  static async getInitialProps ({ Component, ctx, url, store, router }) {
    console.log('router', router.asPath)
    if (ctx.pathname !== LOGIN_URL && redirectIfNotAuthenticated(ctx, router.asPath)) {
      return {}
    }
    if (ctx.pathname === LOGIN_URL && redirectIfAuthenticated(ctx)) {
      return {}
    }

    // check on the server if the jwt token is valid and set state in redux
    if (ctx.pathname !== LOGIN_URL) {
      const res = await verifyJwt(ctx)
      const authenticated = !!res.id

      const payload = { authenticated, authData: res }
      ctx.store.dispatch({type: SET_AUTHENTICATED, payload})
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider
          store={store}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}>
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}>
              <CssBaseline />
              <Component
                pageContext={this.pageContext}
                {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(AvintyApp)
