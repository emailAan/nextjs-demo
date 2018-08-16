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

    const letterValue = (str) => {
      var anum = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10,
        k: 11,
        l: 12,
        m: 13,
        n: 14,
        o: 15,
        p: 16,
        q: 17,
        r: 18,
        s: 19,
        t: 20,
        u: 21,
        v: 22,
        w: 23,
        x: 24,
        y: 25,
        z: 26
      }
      if (str.length === 1) return anum[str] || ' '
      return str.split('').map(letterValue).reduce((accu, curr) => accu + curr)
    }

    const MODULE_PREFIX = 'modules'

    var modules = proxy(`/${MODULE_PREFIX}`, {
      target: `http://${MODULE_PREFIX}:3000/`,
      pathRewrite:
        function (path, req) {
          var moduleHost = req.originalUrl.split('/')[2]
          console.log(path.replace(`/${MODULE_PREFIX}/${moduleHost}`, ''))
          return path.replace(`/${MODULE_PREFIX}/${moduleHost}`, '')
          // return path.replace(`/${MODULE_PREFIX}`, '')
        },
      router: function (req) {
        const MODULE = req.originalUrl.split('/')[2]
        const MODULE_PORT = 65535 - letterValue(MODULE)
        console.log(`http://localhost:${MODULE_PORT}`)
        // return `http://${MODULE}:${MODULE_PORT}`
        return `http://localhost:${MODULE_PORT}`
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
