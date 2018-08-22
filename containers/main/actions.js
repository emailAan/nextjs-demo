import * as constants from './constants'

export function newDashboard (dashboard) {
  return { type: constants.NEW_DASHBOARD, dashboard }
}
