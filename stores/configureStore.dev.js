import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import logger from '../services/logger-service'
import rootReducer from '../reducers'

const configureStore = (initialState) => {
  const isServer = typeof window === 'undefined'
  const devtoolsAvailable = !isServer && !!window.__REDUX_DEVTOOLS_EXTENSION__

  let enhancer
  if (devtoolsAvailable) {
    enhancer = compose(
      applyMiddleware(thunk, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  } else {
    enhancer = compose(
      applyMiddleware(thunk, logger)
    )
  }

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default))
  }

  return store
}
export default configureStore
