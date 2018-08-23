
const {minifyParameters} = require('./parameters')
const routes = module.exports = require('next-routes')()

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

routes
  .add('selectie', '/selectie', 'dashboard-selection')
  .add('dashboard', '/d/:id', 'dashboard')
  .add('module', '/d/:id/:module', 'dashboard')
