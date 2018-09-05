import * as constants from './constants'

const initialState = {
  name: null,
  username: null,
  id: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_USER: {
      return {
        ...state,
        ...action.payload
      }
    }
    case constants.CLEAR_USER: {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}

export default reducer
