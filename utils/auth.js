import { setCookie, removeCookie } from './session'
import { authenticate, verify, logout, refreshToken, refreshTokenOnServer } from '../services/authApi'

const jwt = require('jsonwebtoken')
const Promise = require('bluebird')

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
  return new Promise((resolve, reject) => {
    jwt.decode(token, (err, decode) => {
      if (err) {
        reject(err)
        return
      }

      resolve(decode)
    })
  })
}

// export const signUp = async (name, email, password, passwordConfirmation) => {
//   const error = validateNewUser(name, email, password, passwordConfirmation)
//   if (error) {
//     return error
//   }

//   const res = await createUser(name, email, password, passwordConfirmation)

//   if (!res.data) {
//     return res
//   }

//   setCookie('success', `${name}, your account was created.`)
//   redirect('/login')
//   return null
// }

// export const getJwt = ctx => {
//   return getCookie(JWT_COOKIE_NAME, ctx.req)
// }

// export const isAuthenticated = ctx => !!getJwt(ctx)

// export const redirectIfAuthenticated = (ctx) => {
//   if (isAuthenticated(ctx)) {
//     const redirectUrl = ctx.query.url || '/'
//     redirect(redirectUrl, ctx)
//     return true
//   }
//   return false
// }

// export const redirectIfNotAuthenticated = (ctx, url) => {
//   if (!isAuthenticated(ctx)) {
//     const redirectUrl = `${LOGIN_URL}?url=${url}`
//     redirect(redirectUrl, ctx)
//     return true
//   }
//   return false
// }
