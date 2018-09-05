import { setCookie, removeCookie } from './session'
import { authenticate, verify, logout, refreshToken, refreshTokenOnServer } from '../services/authApi'

import jwt from 'jsonwebtoken'

const JWT_COOKIE_NAME = 'jwt'

export const signIn = async (email, password) => {
  const res = await authenticate(email, password)
  if (res.token) {
    setCookie(JWT_COOKIE_NAME, res.token)
  }

  return res
}

export const verifyJwt = async (jwt) => {
  const res = await verify(jwt)

  return res
}

export const refreshJwt = async () => {
  const res = await refreshToken()
  if (res.token) {
    setCookie(JWT_COOKIE_NAME, res.token)
  }

  return res
}

export const refreshJwtOnServer = async (refreshToken) => {
  const res = await refreshTokenOnServer(refreshToken)
  if (res.token) {
    setCookie(JWT_COOKIE_NAME, res.token)
  }

  return res
}

export const signOut = async (ctx = {}) => {
  if (process.browser) {
    removeCookie(JWT_COOKIE_NAME)
    return logout()
  }
}

export const decodeJwt = (token) => {
  return jwt.decode(token)
}
