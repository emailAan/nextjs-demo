const express = require('express')
const next = require('next')

const modulesProxy = require('./modules-proxy')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 80

const dashboardData = {}
dashboardData['4H7V9A2S'] = {
  title: 'Medewerker dashboard',
  navData: [
    {label: 'Caseload', id: 'caseload', parameters: {m: 8463}},
    {label: 'Agenda', id: 'agenda', parameters: {m: 8463}}
  ]
}
dashboardData['3JHD4GT5'] = {
  title: 'Client dashboard',
  navData: [
    {label: 'Agenda', id: 'agenda', parameters: {c: 1234, m: 2353}},
    {label: 'Personalia', id: 'personalia', parameters: {c: 1234, i: 5}},
    {label: 'Zorgplandoelen', id: 'zorgplandoelen', parameters: {c: 1234, i: 5}}
  ]
}

const modulesMetaData = {
  agenda: {
    label: 'Agenda',
    id: 'agenda',
    type: 'react'
  },
  personalia: {
    label: 'Personalia',
    id: 60,
    type: 'adf'
  },
  zorgplandoelen: {
    label: 'Zorgplandoelen',
    id: 21,
    type: 'adf'
  },
  caseload: {
    label: 'Caseload',
    id: 'caseload',
    type: 'react'
  }
}

app.prepare()
  .then(() => {
    const server = express()

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

    server.get('/api/dashboard/:variables', (req, res) => {
      res.status(200).send(dashboardData[req.params.variables])
    })

    server.get('/api/modules/:module', (req, res) => {
      const module = modulesMetaData[req.params.module]
      res.status(module ? 200 : 204).send(module || {})
    })

    server.get('/personalia/:id', (req, res) => {
      const actualPage = '/personalia'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.use(modulesProxy)

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
