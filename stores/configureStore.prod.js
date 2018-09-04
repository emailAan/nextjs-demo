import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const enhancer = compose(
  applyMiddleware(thunk)
)

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}

export default configureStore
