import * as constants from './constants'

export function newDashboard (dashboard) {
  return { type: constants.NEW_DASHBOARD, dashboard }
}

export function setAuthentication (authInfo) {
  return {type: constants.SET_AUTHENTICATED, payload: authInfo}
}
