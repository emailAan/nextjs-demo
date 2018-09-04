import {isServer} from './is-server'
import {SERVER_PORT} from '.'
import {refreshJwt} from './auth'

export const baseUrl = isServer ? `http://localhost:${SERVER_PORT}` : ''
export const apiBaseUrl = `${baseUrl}/api`
export const moduleBaseUrl = `${baseUrl}/modules`
export const moduleApiBaseUrl = `${apiBaseUrl}/modules`

export const getModuleBaseUrl = (module) => `${moduleBaseUrl}/${module}`
export const getModuleApiUrl = (module) => `${moduleApiBaseUrl}/${module}`
export const getModuleComponentUrl = (module) => `${moduleBaseUrl}/${module}/component.js`

const refreshJwtRetryCall = async (apiRecallFunc) => {
  const res = await refreshJwt()

  return apiRecallFunc(res.token)
}

export const apiGet = async (url, jwt, headers) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      ...(headers || {}),
      'x-access-token': jwt
    },
    credentials: 'include'
  })
  // console.log('poging')
  // const res = await fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     ...(headers || {}),
  //     'x-access-token': jwt
  //   },
  //   credentials: 'include'
  // })

  // return res.status === 401
  //   ? refreshJwtRetryCall(async (refreshedJwt) => apiGet(url, refreshedJwt, headers))
  //   : res
}
