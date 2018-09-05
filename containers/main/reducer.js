import * as constants from './constants'

const initialState = {
  loadedDashboards: {},
  currentDashboardId: null,
  title: 'Avinty',
  subTitle: 'ZORGVERNIEUWERS NET ALS JIJ',
  authenticated: false,
  authData: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.NEW_DASHBOARD: {
      const {dashboard} = action
      const {loadedDashboards} = state
      const newLoadedDashboards = { ...loadedDashboards }
      newLoadedDashboards[dashboard.id] = dashboard

      return {
        ...state,
        loadedDashboards: newLoadedDashboards,
        currentDashboardId: dashboard.id
      }
    }
    case constants.SET_AUTHENTICATED: {
      return {
        ...state,
        authenticated: action.payload.authenticated,
        authData: action.payload.authData
      }
    }
    default:
      return state
  }
}

export default reducer
