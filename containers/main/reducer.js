/*
  @observable loadedDashboards = {}
  @observable currentDashboardId
  @observable title = 'Avinty'
  @observable subTitle = 'ZORGVERNIEUWERS NET ALS JIJ'
*/
import * as constants from './constants'

const initialState = {
  loadedDashboards: {},
  currentDashboardId: null,
  title: 'Avinty',
  subTitle: 'ZORGVERNIEUWERS NET ALS JIJ'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.NEW_DASHBOARD: {
      const {dashboard} = action
      const {loadedDashboards} = state
      const newLoadedDashboards = { ...loadedDashboards }
      newLoadedDashboards[dashboard.id] = dashboard

      return { ...state, loadedDashboards: newLoadedDashboards, currentDashboardId: dashboard.id }
    }
    default:
      return state
  }
}

export default reducer
