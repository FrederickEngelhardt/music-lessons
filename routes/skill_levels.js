'use strict'

const express = require('express')
const knex = require('../knex')
const boom = require('boom')
const router = express.Router()

router.get('/skill_levels', (req, res, next) => {
  return knex('skill_levels')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/skill_levels/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  return knex('skill_levels')
    .where({id})
    .first()
    .then(data => {
      if (!data) {
        return next(boom.create(404, `Not Found`))
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/skill_levels', (req, res, next) => {
  const { skill_level } = req.body
  const newLevel = { skill_level }
  if (!skill_level || skill_level.trim()) {
    return next(boom.create(400, `Skill level must not be blank`))
  }
  return knex.insert(newLevel, '*')
    .into('skill_levels')
    .then(data => {
      res.status(201).json(data[0])
    })
    .catch(err => {
      next(err)
    })
})

router.patch('/skill_levels/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const { skill_level } = req.body
  const newLevel = { skill_level }
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  knex('skill_levels')
    .where({id})
    .first()
    .then(data => {
      if (!data) {
        return next(boom.create(404, `Not Found`))
      }
      return knex('skill_levels')
        .update(newLevel, '*')
        .where({id})
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/skill_levels/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  return knex('skill_levels')
    .where({id})
    .first()
    .del()
    .then(data => {
      if (!data) {
        return next(boom.create(404, `Not Found`))
      }
      res.status(204).json(data)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
