import * as constants from './constants'

const initialState = {
  jwtToken: null,
  name: null,
  username: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MODULE: {
      const {module, moduleMetaData, moduleParameters, moduleTitle} = action.data
      return { ...state, module, moduleMetaData, moduleParameters, moduleTitle }
    }
    case constants.INIT_DASHBOARD: {
      return { ...state, ...action.dashboard }
    }
    default:
      return state
  }
}

export default reducer
