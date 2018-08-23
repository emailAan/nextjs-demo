import configureStore from './configureStore'

export const initializeStore = (initialState) => {
  const store = configureStore(initialState)

  return store
}
