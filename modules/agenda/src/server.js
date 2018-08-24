const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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

const MODULE = 'agenda'
const PORT = 65535 - letterValue(MODULE)

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', (req, res) => res.status(200).send({
  id: MODULE,
  label: 'Agenda',
  type: 'react',
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
