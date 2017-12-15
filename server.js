'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000
const path = require('path')
const uuid = require('uuid/v1');
const knex = require('./knex.js')

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(fileUpload())

const lessons = require('./routes/lessons')
const skill_levels = require('./routes/skill_levels')
const users = require('./routes/users')
const token = require('./routes/token')

app.use(lessons)
app.use(skill_levels)
app.use(users)
app.use(token)

app.post('/users/:id/upload', function(req, res, next) {
  console.log(req.files);
  const id = req.params.id
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const user_avatar = req.files.user_avatar;
  const avatar = uuid()+user_avatar.name
  const fileDir = path.join(__dirname, 'user_images', avatar);
  // add user id to filename
  // Use the mv() method to place the file somewhere on your server
  user_avatar.mv(fileDir, function(err) {
    if (err){
      return res.status(500).send(err);
    }
    knex('users')
    .where({id})
    .update({user_avatar: avatar}, '*')
    .then( data => {
      res.send('Avatar uploaded!');
    })
  });
});


app.use((req, res, next) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).send(err.message)
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
