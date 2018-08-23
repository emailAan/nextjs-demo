const invert = require('lodash/invert')

const toNormalMap = {'c': 'client', 'i': 'inschrijving', 'm': 'medewerker'}
const toMinifiedMap = invert(toNormalMap)

const minifyParameters = (params) => {
  let convertedParams = {}
  for (var key in params) {
    let newKey = key in toMinifiedMap ? toMinifiedMap[key] : key
    convertedParams[newKey] = params[key]
  }

  return convertedParams
}

const parseParametersString = (parametersString) => {
  const minifiedParameters = JSON.parse(parametersString)
  return convertParameters(minifiedParameters)
}

const stringifyParameters = (params) => {
  const minifiedParameters = minifyParameters(params)
  return JSON.stringify(minifiedParameters)
}

const convertParameters = (params) => {
  let convertedParams = {}
  for (var key in params) {
    let newKey = key in toNormalMap ? toNormalMap[key] : key
    convertedParams[newKey] = params[key]
  }

  return convertedParams
}

const parametersToUrlQuery = (p) => {
  return !p ? '' : Object.keys(p)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(p[key])}`)
    .join('&')
}

const parametersToCustomStringFormat = (parameters, separator = ';') => {
  return !parameters ? '' : Object.keys(parameters)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
    .join(separator)
}

module.exports = {
  minifyParameters,
  parseParametersString,
  stringifyParameters,
  convertParameters,
  parametersToUrlQuery,
  parametersToCustomStringFormat
}
