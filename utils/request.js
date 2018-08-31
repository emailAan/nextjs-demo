import axios from 'axios'

export const post = async (endpoint, data) => {
  return axios.post(endpoint, data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const get = async (endpoint, jwt) => {
  const headers = jwt
    ? {
      headers: { Authorization: `Bearer ${jwt}` }
    }
    : null
  return axios.get(endpoint, headers)
}
