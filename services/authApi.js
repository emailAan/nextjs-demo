// import { post } from '../utils/request'
import {apiBaseUrl} from '../utils/api'

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

  if (res.status === 200) {
    const tokenReply = await res.json()
    return {jwt: tokenReply.token}
  } else {
    return 'Ongeldige combinatie'
  }
}

export const verify = async (jwt) => {
  const url = `${apiBaseUrl}/auth/me`
  const myHeaders = new Headers()

  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('x-access-token', jwt)

  const res = await fetch(url, {
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
  })

  if (res.status === 200) {
    const authData = await res.json()
    authData.jwt = jwt
    return authData
  } else {
    return res.status
  }
}

export const logout = () => {
  const url = `${apiBaseUrl}/auth/logout`

  return fetch(url, {
    method: 'GET',
    credentials: 'include'
  })
}
