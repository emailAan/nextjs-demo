import invert from 'lodash/invert'

const toNormalMap = {'c': 'client', 'i': 'inschrijving'}
const toMinifiedMap = invert(toNormalMap)

export const minifyParameters = (params) => {
  let convertedParams = {}
  for (var key in params) {
    let newKey = key in toMinifiedMap ? toMinifiedMap[key] : key
    convertedParams[newKey] = params[key]
  }

  return convertedParams
}

export const parseParametersString = (parametersString) => {
  const minifiedParameters = JSON.parse(parametersString)
  return convertParameters(minifiedParameters)
}

export const stringifyParameters = (params) => {
  const minifiedParameters = minifyParameters(params)
  return JSON.stringify(minifiedParameters)
}

export const convertParameters = (params) => {
  let convertedParams = {}
  for (var key in params) {
    let newKey = key in toNormalMap ? toNormalMap[key] : key
    convertedParams[newKey] = params[key]
  }

  return convertedParams
}

export const parametersToUrlQuery = (p) => {
  return !p ? '' : Object.keys(p)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(p[key])}`)
    .join('&')
}

export const parametersToCustomStringFormat = (parameters, separator = ';') => {
  return !parameters ? '' : Object.keys(parameters)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
    .join(separator)
}
