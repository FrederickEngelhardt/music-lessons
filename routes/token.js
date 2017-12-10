'use strict'

const bcrypt = require('bcrypt')
const boom = require('boom')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('knex')
const router = express.Router()

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(200).send(false)
    }
    res.status(200).send(true)
  })
})

router.post('/token', (req, res, next) => {

})

router.delete('/token', (req, res, next) => {
  res.clearCookie('token')
  res.end()
})

module.exports = router
