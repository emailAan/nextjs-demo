const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const uuidv1 = require('uuid/v1')
// const redis = require('redis')
const redis = require('async-redis')
const client = redis.createClient()

const config = require('../utils/config')
const VerifyToken = require('./verify-token')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const getUsers = async () => {
  const strUser = await client.get('users')

  return JSON.parse(strUser)
}

const addUser = async (user) => {
  const users = await getUsers()

  users[user.id] = user
  client.set('users', JSON.stringify(users))
}

const findUserByUsername = async (username) => {
  const users = await getUsers()
  console.log(`searching for ${username} in:`, users)
  for (var id in users) {
    if (users.hasOwnProperty(id) && users[id].username === username
    ) {
      return users[id]
    }
  }

  return null
}

const findUserById = async (id) => {
  const users = await getUsers()

  return users[id]
}

router.post('/register', (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8)
  let userId = uuidv1()

  let user = {
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
    id: userId
  }

  addUser(user)

  var token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })

  res.status(200).send({ auth: true, token: token })
})

router.get('/me', VerifyToken, async (req, res) => {
  const userWithPwd = await findUserById(req.userId)

  if (!userWithPwd) return res.status(404).send('No user found.')

  if (userWithPwd != null) {
    delete userWithPwd.password

    res.status(200).send(userWithPwd)
  }
})

router.post('/login', async (req, res) => {
  console.log(req.body)
  const user = await findUserByUsername(req.body.username)

  if (!user) return res.status(404).send('No user found.')

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
  if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
  var token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })

  res.status(200).send({ auth: true, token: token })
})

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null })
})

module.exports = router
