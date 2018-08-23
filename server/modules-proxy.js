
const dev = process.env.NODE_ENV !== 'production'

let modulesProxy = (dev)
  ? require('./modules-proxy-dev')
  : require('./modules-proxy-prod')

module.exports = modulesProxy
