import * as constants from './constants'

export function initDashboard (dashboard) {
  return { type: constants.INIT_DASHBOARD, dashboard }
}

export function setModule (module, moduleMetaData, moduleParameters) {
  return { type: constants.SET_MODULE, data: { module, moduleMetaData, moduleParameters } }
}
