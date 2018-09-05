import {isServer} from './is-server'
import {SERVER_PORT} from '.'

export const baseUrl = isServer ? `http://localhost:${SERVER_PORT}` : ''
export const apiBaseUrl = `${baseUrl}/api`
export const moduleBaseUrl = `${baseUrl}/modules`
export const moduleApiBaseUrl = `${apiBaseUrl}/modules`

export const getModuleBaseUrl = (module) => `${moduleBaseUrl}/${module}`
export const getModuleApiUrl = (module) => `${moduleApiBaseUrl}/${module}`
export const getModuleComponentUrl = (module) => `${moduleBaseUrl}/${module}/component.js`
