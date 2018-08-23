import {isServer} from './is-server'

export const baseUrl = isServer ? 'http://localhost' : ''
export const apiBaseUrl = `${baseUrl}/api`
export const moduleBaseUrl = `${baseUrl}/modules`
export const moduleApiBaseUrl = `${apiBaseUrl}/modules`

export const getModuleBaseUrl = (module) => `${moduleBaseUrl}/${module}`
export const getModuleApiUrl = (module) => `${moduleApiBaseUrl}/${module}`
export const getModuleComponentUrl = (module) => `${moduleBaseUrl}/${module}/component.js`
