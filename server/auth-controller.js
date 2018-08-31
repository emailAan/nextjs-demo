const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const uuidv1 = require('uuid/v1')
const redis = require('async-redis')
const client = redis.createClient()

const config = require('../utils/config')
const VerifyToken = require('./verify-token')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const getUsers = async () => {
  const strUser = await client.get('users')

  return JSON.parse(strUser) || { }
}

const addUser = async (user) => {
  const users = await getUsers()

  users[user.id] = user
  client.set('users', JSON.stringify(users))
}

const findUserByUsername = async (username) => {
  const users = await getUsers()

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

/// /////////////////////////////////////

const createAuthToken = (userId) => {
  return jwt.sign({ id: userId }, config.secret, {
    expiresIn: config.tokenLife
  })
}

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife
  })
}

/// router methods /////////////////////////////////////

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
  var token = createAuthToken(user.id)

  res.status(200).send({ auth: true, token: token })
})

router.get('/me', VerifyToken, async (req, res) => {
  const userWithPwd = await findUserById(req.userId)

  if (!userWithPwd) return res.status(404).send({ auth: false, message: 'No user found.' })

  if (userWithPwd != null) {
    delete userWithPwd.password

    res.status(200).send({ auth: true, user: userWithPwd })
  }
})

router.post('/login', async (req, res) => {
  const user = await findUserByUsername(req.body.username)

  if (!user) return res.status(404).send({ auth: false, message: 'No user found.' })

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

  if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

  const expiryDate = new Date(Date.now() + config.refreshTokenLife * 1000)
  const refreshToken = createRefreshToken(user.id)

  res.cookie('refreshToken', refreshToken, {
    maxAge: config.refreshTokenLife * 1000,
    httpOnly: true,
    expires: expiryDate
  })

  const authToken = createAuthToken(user.id)
  res.status(200).send({ auth: true, token: authToken })
})

router.get('/logout', (req, res) => {
  res.clearCookie('sessionToken')
  res.clearCookie('jwt')

  res.status(200).send({ auth: false, token: null })
})

router.post('/refresh', (req, res) => {
  console.log('Cookies: ', req.cookies)
  console.log('body: ', req.body)
  res.clearCookie('jwt')

  const refreshToken = req.cookies.refreshToken || req.body.refreshToken
  const userId = req.body.id

  jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }

    if (userId !== decoded.id) {
      return res.status(500).send({ auth: false, message: 'Wrong user id.' })
    }

    const authToken = createAuthToken(userId)
    return res.status(200).send({ auth: true, token: authToken })
  })
})

module.exports = router
