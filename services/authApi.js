// import { post } from '../utils/request'
import {apiBaseUrl} from '../utils/api'
import 'url-search-params-polyfill'

export const authenticate = async (username, password) => {
  const url = `${apiBaseUrl}/auth/login`

  const data = new URLSearchParams()
  data.append('username', username)
  data.append('password', password)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    credentials: 'include',
    body: data
  })

  return res.json()
}

export const verify = async (jwt) => {
  const url = `${apiBaseUrl}/auth/me`
  // const myHeaders = new Headers()

  // myHeaders.append('Content-Type', 'application/json')
  // myHeaders.append('x-access-token', jwt)

  const res = await fetch(url, {
    method: 'GET',
    // headers: myHeaders,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'x-access-token': jwt
    },
    credentials: 'include'
  })

  return res.json()
}

export const logout = async () => {
  const url = `${apiBaseUrl}/auth/logout`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  return res.json()
}

export const refreshToken = async (userId) => {
  const url = `${apiBaseUrl}/auth/refresh`

  const data = new URLSearchParams()
  data.append('id', userId)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: data,
    credentials: 'include'
  })

  return res.json()
}

export const refreshTokenOnServer = async (userId, refreshToken) => {
  const url = `${apiBaseUrl}/auth/refresh`

  const data = new URLSearchParams()
  data.append('id', userId)
  data.append('refreshToken', refreshToken)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: data,
    credentials: 'include'
  })

  return res.json()
}
