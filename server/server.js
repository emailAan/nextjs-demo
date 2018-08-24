const express = require('express')
const next = require('next')

const { modules, moduleApis } = require('./modules-proxy')
const AuthController = require('./auth-controller')
const routes = require('../utils/routes')
const setDashboardApi = require('./dashboard-api')
const { SERVER_PORT } = require('../utils')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const port = SERVER_PORT

app.prepare()
  .then(() => {
    const server = express()

    setDashboardApi(server)

    server.use('/api/auth', AuthController)
    server.use(modules)
    server.use(moduleApis)

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
