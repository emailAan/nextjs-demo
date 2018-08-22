export const loadState = () => {
  try {
    const serializedState = JSON.parse(window.localStorage.getItem('state'))
    if (serializedState === null) {
      return undefined
    }
    return serializedState
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem('state', serializedState)
  } catch (e) {
  }
}

export const resetState = () => {
  try {
    window.localStorage.setItem('state', null)
  } catch (e) {
  }
}
