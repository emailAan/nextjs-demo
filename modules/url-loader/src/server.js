const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000
const MODULE = 'url-loader'

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', (req, res) => res.status(200).send({
  name: MODULE,
  label: 'Url-loader',
  stateless: false
}))

app.listen(PORT, () => console.log(`${MODULE} module listening on port ${PORT}!`))
