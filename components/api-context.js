import React from 'react'

import { refreshJwt, decodeJwt } from '../utils/auth'
import {setAuthentication} from '../containers/main/actions'
import {getJwt} from '../containers/main/selectors'
import redirect from '../utils/redirect'

const ApiContext = React.createContext({})

const apiGet = async (url, jwt, headers) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      ...(headers || {}),
      'x-access-token': jwt
    },
    credentials: 'include'
  })
}

const isValidToken = (token) => {
  const decoded = decodeJwt(token)
  const now = Date.now().valueOf() / 1000

  return decoded.exp > now
}

const refreshOrRedirect = async (store, jwt) => {
  const refreshRes = await refreshJwt({ isServer: false })
  // Save the result of the renewal of the JWT
  store.dispatch(setAuthentication({ authenticated: refreshRes.auth, authData: refreshRes }))
  if (!refreshRes.auth) {
    redirect('/', {})
  }

  return refreshRes.token
}

const apiGetWithRefreshToken = async (store, url, headers, retry = true) => {
  let jwt = getJwt(store.getState())

  if (!isValidToken(jwt)) {
    jwt = await refreshOrRedirect(store, jwt)

    if (!jwt) { return {} }
  }

  const res = await apiGet(url, jwt, headers)

  if (res.status === 401 && retry) {
    jwt = await refreshOrRedirect(store, jwt)

    return apiGetWithRefreshToken(store, url, headers, false)
  }

  return res
}

export const getApiContext = (store) => {
  return {
    apiGet: async (url, headers) => apiGetWithRefreshToken(store, url, headers)
  }
}

export const withApiContext = (Page) => {
  return class extends React.Component {
    static getInitialProps (ctx) {
      if (Page.getInitialProps) { return Page.getInitialProps(ctx) }
    }
    render () {
      return <ApiContext.Consumer>
        {apiCtx => <Page {...this.props} apiCtx={apiCtx} />}
      </ApiContext.Consumer>
    }
  }
}

export const ApiProvider = ApiContext.Provider

export default ApiContext
