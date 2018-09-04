import {decodeJwt} from '../../utils/auth'

export const getJwtData = (token) => {
  return () => decodeJwt(token)
}
