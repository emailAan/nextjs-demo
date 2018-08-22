import * as constants from './constants'

const initialState = {
  id: '',
  title: 'Dashboard',
  module: '',
  moduleParameters: {},
  moduleMetaData: {},
  parameters: {},
  navData: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MODULE: {
      const {module, moduleMetaData, moduleParameters} = action.data
      return { ...state, module, moduleMetaData, moduleParameters }
    }
    case constants.INIT_DASHBOARD: {
      return { ...state, ...action.dashboard, module: null, moduleMetaData: null, moduleParameters: null }
    }
    default:
      return state
  }
}

export default reducer
