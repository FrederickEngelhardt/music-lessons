'use strict'

const bcrypt = require('bcrypt')
const boom = require('boom')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const router = express.Router()

router.get('/users', (req, res, next) => {
  return knex('users').orderBy('last_name', 'desc')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  return knex('users')
    .where({id})
    .first()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/users', (req, res, next) => {
  const { email_address, password } = req.body

  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)) {
    return next(boom.create(400, `Password must contain one upper-case letter, one number, and one special character`))
  }
  if (!email_address) {
    return next(boom.create(400, `Email must not be blank`))
  }
  knex('users')
    .where({email_address})
    .first()
    .then(user => {
      if (user) {
        return res.sendStatus(400)
      }
      return bcrypt.hash(password, 10)
    })
    .then(hashed_password => {
      const { first_name, last_name, phone_number, skill_level_id, bio} = req.body
      const insert = { first_name, last_name, phone_number, email_address, hashed_password, skill_level_id, bio}

      return knex.insert(insert, '*')
        .into('users')
    })
    .then(data => {
      const user = data[0]
      const claim = { user_id: user.id }
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '1 day'
      })

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: router.get('env') === 'production'
      })

      delete user.hashed_password
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  return knex('users')
    .where({id})
    .first()
    .del()
    .then(data => {
      res.status(204).json(data)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
