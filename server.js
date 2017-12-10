'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const port = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('public'))

const lessons = require('./routes/lessons')
// const skill_levels = require('./routes/skill_levels')
// const users = require('./routes/users')
// const token = require('./routes/token')

app.use(lessons)
// app.use(skill_levels)
// app.use(users)
// app.use(token)

app.use((err, req, res, next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message)
  }
  console.error(err.stack)
  res.sendStatus(500)
})
app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
