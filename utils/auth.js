import redirect from './redirect'
// import {LOGIN_URL} from './routes'
import { setCookie, removeCookie } from './session'
import { authenticate, verify, logout, refreshToken, refreshTokenOnServer } from '../services/authApi'

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

export const refreshJwt = async (userId) => {
  const res = await refreshToken(userId)
  if (res.token) {
    setCookie(JWT_COOKIE_NAME, res.token)
  }

  return res
}

export const refreshJwtOnServer = async (userId, refreshToken) => {
  const res = await refreshTokenOnServer(userId, refreshToken)
  if (res.token) {
    setCookie(JWT_COOKIE_NAME, res.token)
  }

  return res
}

export const signOut = async (ctx = {}) => {
  if (process.browser) {
    removeCookie(JWT_COOKIE_NAME)
    await logout()
    redirect('/login', ctx)
  }
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
