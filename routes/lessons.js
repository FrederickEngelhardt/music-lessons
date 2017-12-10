'use strict'

const express = require('express')
const knex = require('../knex')
const boom = require('boom')
const router = express.Router()

// const authorize = (req, res, next) => {
//   jwt.verify(req.cookies.token, process.env.JWT_KEY)
// }

router.get('/lessons', (req, res, next) => {
  return knex('lessons').orderBy('date_time', 'desc')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/lessons/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  return knex('lessons')
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

router.post('/lessons', (req, res, next) => {
  const { user_client_id, user_instructor_id, location, cost, date_time, lesson_name } = req.body
  const newLesson = { user_client_id, user_instructor_id, location, cost, date_time, lesson_name }
  if (!user_client_id) {
    return next(boom.create(400, `Instructor ID must not be blank`))
  }
  if (!user_instructor_id) {
    return next(boom.create(400, `Instructor ID must not be blank`))
  }
  if (!location) {
    return next(boom.create(400, `Location must not be blank`))
  }
  if (!cost) {
    return next(boom.create(400, `Cost must not be blank`))
  }
  if (!date_time) {
    return next(boom.create(400, `Date and time must not be blank`))
  }
  if (!lesson_name) {
    return next(boom.create(400, `Lesson must not be blank`))
  }
  return knex.insert(newLesson, '*')
    .into('lessons')
    .then(data => {
      res.status(201).json(data[0])
    })
    .catch(err => {
      next(err)
    })
})

router.patch('/lessons/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const { user_client_id, user_instructor_id, location, cost, date_time, lesson_name } = req.body
  const newLesson = { user_client_id, user_instructor_id, location, cost, date_time, lesson_name }
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  knex('lessons')
    .where({id})
    .first()
    .then(data => {
      if (!data) {
        return next(boom.create(404, `Not Found`))
      }
      return knex('lessons')
        .update(newLesson, '*')
        .where({id})
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/lessons/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next(boom.create(404, `Not Found`))
  }
  return knex('lessons')
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
