import { combineReducers } from 'redux'

import dashboard from '../containers/dashboard/reducer'
import main from '../containers/main/reducer'
import account from '../containers/account/reducer'

const rootReducer = combineReducers({
  main, dashboard, account
})

export default rootReducer
