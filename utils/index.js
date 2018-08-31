const SERVER_PORT = 8080

module.exports = {
  ...require('./parameters'),
  ...require('./is-server'),
  SERVER_PORT
}
