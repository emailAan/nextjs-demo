import * as constants from './constants'

const initialState = {
  id: '',
  title: 'Dashboard',
  module: '',
  moduleParameters: {},
  moduleMetaData: {},
  navData: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MODULE: {
      const {module, moduleMetaData, moduleParameters} = action.data
      return { ...state, module, moduleMetaData, moduleParameters }
    }
    case constants.INIT_DASHBOARD: {
      return { ...state, ...action.dashboard }
    }
    default:
      return state
  }
}

export default reducer
