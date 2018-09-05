import {decodeJwt} from '../../utils/auth'
import {apiBaseUrl} from '../../utils/api'
import * as constants from './constants'

export const getJwtData = (token) => {
  return () => decodeJwt(token)
}

const setUser = (accountInfo) => ({ type: constants.SET_USER, payload: accountInfo })

const fetchAccountInfo = async (apiCtx) => {
  const res = await apiCtx.apiGet(`${apiBaseUrl}/auth/me`)
  return res.json()
}

export const getAccountInfo = (apiCtx) => {
  return (dispatch) => {
    return fetchAccountInfo(apiCtx).then(
      res => dispatch(setUser(res.user)),
      error => {
        console.log(error)
        return dispatch(setUser({}))
      }
    )
  }
}
