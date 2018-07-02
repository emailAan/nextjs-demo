const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000
const MODULE = 'agenda'

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', (req, res) => res.status(200).send({
  name: MODULE,
  label: 'Agenda',
  counter: `/api/${MODULE}/counter`,
  stateless: false
}))

app.get('/api/afsprakenVandaag', (req, res) => res.status(200).send({
  name: MODULE,
  subModule: 'afsprakenVandaag',
  label: 'Afspraken van vandaag',
  counter: `/api/${MODULE}/counter/afsprakenVandaag`,
  stateless: false
}))

app.get('/api/counter', function (req, res) {
  let counterData = { count: 6 }
  res.status(200).send(counterData)
})

app.get('/api/counter/afsprakenVandaag', function (req, res) {
  let counterData = { count: 1 }
  res.status(200).send(counterData)
})

app.listen(PORT, () => console.log(`${MODULE} module listening on port ${PORT}!`))
