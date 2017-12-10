'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-as-promised')
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
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .where({id})
    .first()
    .then(data => {
      if (!data) {
        return next({ status: 404, message: `Not Found` })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/users', (req, res, next) => {
  const { first_name, last_name, phone_number, skill_level_id, bio, email_address, password } = req.body
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)) {
    return next({ status: 400, message: `Password must contain at least one upper-case letter, one number, and one special character` })
  }
  if (!email_address) {
    return next({ status: 400, message: `Email must not be blank` })
  }
  return knex('users')
    .where({email_address})
    .first()
    .then(user => {
      return bcrypt.hash(password, 10)
    })
    .then(hashed_password => {
      const insert = { first_name, last_name, phone_number, email_address, hashed_password, skill_level_id, bio}
      return knex.insert(insert, '*')
        .into('users')
    })
    .then(data => {
      if (!data) {
        return next({ status: 400, message: `User account already exists` })
      }
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

      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
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
