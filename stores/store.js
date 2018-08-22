import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'
import configureStore from './configureStore'

export const initializeStore = () => {
  let persistedState = loadState()

  const store = configureStore(persistedState)

  store.subscribe(throttle(() => saveState(store.getState()), 1000))

  return store
}
