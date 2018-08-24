const dashboardData = {}
dashboardData['4H7V9A2S'] = {
  title: 'Medewerker dashboard',
  navData: [
    {label: 'Caseload', id: 'caseload', parameters: {m: 8463}},
    {label: 'Agenda', id: 'adf-60', parameters: {m: 8463}}
  ]
}
dashboardData['3JHD4GT5'] = {
  title: 'Client dashboard',
  navData: [
    {label: 'Agenda', id: 'agenda', parameters: {c: 1234, m: 2353}},
    {label: 'Personalia', id: 'adf-60', parameters: {c: 1234, i: 5}},
    {label: 'Zorgplandoelen', id: 'adf-21', parameters: {c: 1234, i: 5}}
  ]
}

module.exports = (server) => {
  server.get('/api/dashboard/:id', (req, res) => {
    let dashboard = dashboardData[req.params.id]
    res.status(dashboard ? 200 : 204).send(dashboard)
  })

  server.get('/api/modules/:module', (req, res, next) => {
    const {module} = req.params

    if (module.startsWith('adf-')) {
      const adfModuleNr = module.replace('adf-', '')

      res.status(200).send({
        label: 'Adf module ' + adfModuleNr,
        id: parseInt(adfModuleNr),
        type: 'adf'
      })
    } else {
      next('route')
    }
  })
}
