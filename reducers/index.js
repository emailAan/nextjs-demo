import { combineReducers } from 'redux'

import dashboard from '../containers/dashboard/reducer'
import main from '../containers/main/reducer'

const rootReducer = combineReducers({
  main, dashboard
})

export default rootReducer
