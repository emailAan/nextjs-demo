
const dev = process.env.NODE_ENV !== 'production'

let moduleProxies = (dev)
  ? require('./modules-proxy-dev')
  : require('./modules-proxy-prod')

module.exports = moduleProxies
