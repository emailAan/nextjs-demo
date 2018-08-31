
const {minifyParameters} = require('./parameters')
const routes = module.exports = require('next-routes')()

routes.LOGIN_URL = '/login'

routes.swithDashboard = () => {
  routes.Router.pushRoute('selectie')
}

routes.openModule = (id, module, parameters) => {
  if (module) {
    routes.Router.pushRoute('module', {id, module, ...minifyParameters(parameters)}, {shallow: true})
  } else {
    routes.Router.pushRoute('dashboard', {id}, {shallow: true})
  }
}

routes.openDashboard = (id) => {
  routes.Router.pushRoute('dashboard', {id}, {shallow: true})
}

routes.openAccount = () => {
  routes.Router.pushRoute('account', {}, {shallow: true})
}

routes
  .add('selectie', '/selectie', 'dashboard-selection')
  .add('dashboard', '/d/:id', 'dashboard')
  .add('account', '/me', 'account')
  .add('module', '/d/:id/:module', 'dashboard')
