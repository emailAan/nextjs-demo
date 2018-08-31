import redirect from './redirect'
import {LOGIN_URL} from './routes'
import { setCookie, getCookie, removeCookie } from './session'
import { authenticate, verify, logout } from '../services/authApi'
// import { validateCredentials } from './validation'

const JWT_COOKIE_NAME = 'jwt'

export const signIn = async (email, password, url) => {
//   const error = validateCredentials(email, password)
//   if (error) {
//     return error
//   }

  const res = await authenticate(email, password)
  if (!res.jwt) {
    return res
  }

  setCookie(JWT_COOKIE_NAME, res.jwt)
  redirect(url)
  return null
}

export const verifyJwt = async (ctx) => {
  const jwt = getJwt(ctx)

  const res = await verify(jwt)

  return res
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

export const signOut = async (ctx = {}) => {
  if (process.browser) {
    removeCookie(JWT_COOKIE_NAME)
    await logout()
    redirect('/login', ctx)
  }
}

export const getJwt = ctx => {
  return getCookie(JWT_COOKIE_NAME, ctx.req)
}

export const isAuthenticated = ctx => !!getJwt(ctx)

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    const redirectUrl = ctx.query.url || '/'
    redirect(redirectUrl, ctx)
    return true
  }
  return false
}

export const redirectIfNotAuthenticated = (ctx, url) => {
  if (!isAuthenticated(ctx)) {
    const redirectUrl = `${LOGIN_URL}?url=${url}`
    redirect(redirectUrl, ctx)
    return true
  }
  return false
}
