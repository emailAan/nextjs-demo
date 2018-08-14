const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000

app.prepare()
  .then(() => {
    const server = express()

    server.get('/u/:id', (req, res) => {
      const actualPage = '/url-loader'
      const queryParams = { url: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/d/:id/:module', (req, res) => {
      const actualPage = '/dashboard'
      const queryParams = { ...req.query, id: req.params.id, module: req.params.module, parameters: req.query }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/d/:id', (req, res) => {
      const actualPage = '/dashboard'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    const dashboardData = {}
    dashboardData['4H7V9A2S'] = {
      title: 'Medewerker dashboard',
      navData: [
        {label: 'Caseload', module: true, id: 'caseload', parameters: {m: 8463}},
        {label: 'Agenda', module: true, id: 'agenda', parameters: {m: 8463}}
      ]
    }
    dashboardData['3JHD4GT5'] = {
      title: 'Client dashboard',
      navData: [
        {label: 'Agenda', module: true, id: 'agenda', parameters: {c: 1234, m: 2353}},
        {label: 'Personalia', module: true, id: 'personalia', parameters: {c: 1234, i: 5}}
      ]
    }

    server.get('/api/dashboard/:variables', (req, res) => res.status(200).send(dashboardData[req.params.variables]))

    server.get('/personalia/:id', (req, res) => {
      const actualPage = '/personalia'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    const MODULE_PREFIX = 'modules'
    const MODULE_PORT = 3000

    var modules = proxy(`/${MODULE_PREFIX}`, {
      target: `http://${MODULE_PREFIX}:${MODULE_PORT}/`,
      pathRewrite:
        function (path, req) {
          var moduleHost = req.originalUrl.split('/')[2]
          console.log(path.replace(`/${MODULE_PREFIX}/${moduleHost}`, ''))
          return path.replace(`/${MODULE_PREFIX}/${moduleHost}`, '')
        },
      router: function (req) {
        var moduleHost = req.originalUrl.split('/')[2]
        console.log(`http://${moduleHost}:${MODULE_PORT}`)
        return `http://${moduleHost}:${MODULE_PORT}`
      },
      changeOrigin: true
    })

    server.use(modules)

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
