import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import css from 'styled-jsx/css'

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import NavBar from '../components/Navbar'
import getPageContext from '../components/getPageContext'

require('es6-promise').polyfill()
require('isomorphic-fetch')

let contentCss = css`
div.content  {
    position: absolute;
    left: 250px;
    right:0px;
    top: 65px;
    padding-left: 5px;
}
div.top {
    position: absolute;
    left: 250px;
    top: 0px;
    right:0px;
    height: 60px;
    padding-left: 5px;
    background-color: #5c646c;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
}
span.brandTitle {
  font-size: 46px;
}
`

const reducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case 'INCREASE':
      let { counter } = state
      return { ...state, counter: counter + 1 }
    default:
      return state
  }
}

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
*/
const makeStore = (initialState, options) => {
  return createStore(reducer, initialState)
}

class CustomApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  pageContext = null;

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    // let response = await fetch('http://localhost:8081/api/navigation')
    // let navData = await response.json()
    let navData = []

    return { pageProps, navData }
  }



  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>

        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >

          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <div className='top'>
              <span className='brandTitle' >Avinty</span>
              <span>ZORGVERNIEUWERS NET ALS JIJ</span>
            </div>
            <div className='content'>
              <Provider store={store}>
                <Component pageContext={this.pageContext}  {...pageProps} />
              </Provider>
            </div>
            <NavBar navData={this.props.navData} />
            <style jsx>{contentCss}</style>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(CustomApp)
