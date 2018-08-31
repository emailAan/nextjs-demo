const express = require('express')
const next = require('next')
const helmet = require('helmet')
const { modules, moduleApis } = require('./modules-proxy')
const AuthController = require('./auth-controller')
const routes = require('../utils/routes')
const ApiDashboard = require('./api-dashboard')
const ApiModuleAdf = require('./api-module-adf')
const { SERVER_PORT } = require('../utils')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = routes.getRequestHandler(app)
const port = SERVER_PORT

const VerifyToken = require('./verify-token')

app.prepare()
  .then(() => {
    const server = express()
    server.use(helmet())

    // setDashboardApi(server)

    // predicate the router with a check and bail out when needed
    server.use('/api/auth', AuthController)
    server.use('/api', VerifyToken)
    server.use('/api/dashboard', ApiDashboard)
    server.use('/api/modules', ApiModuleAdf)
    server.use('/api', moduleApis)
    server.use(modules)

    // Let the rest handle by Next.js
    server.get('/login', (req, res) => {
      return handle(req, res)
    })

    // Let the rest handle by Next.js
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
