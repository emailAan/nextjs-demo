const express = require('express')
const router = express.Router()

router.get('/:module', (req, res, next) => {
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

module.exports = router
