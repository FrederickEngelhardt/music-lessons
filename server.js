'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

const port = process.env.PORT || 3000

app.disable('x-powered-by')
// app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('public'))

const lessons = require('./routes/lessons')
const skill_levels = require('./routes/skill_levels')
const users = require('./routes/users')
const token = require('./routes/token')

app.use(lessons)
app.use(skill_levels)
app.use(users)
app.use(token)

app.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable}));

app.post("/charge", (req, res) => {
  let amount = 5000;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Lesson Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});

app.listen(4567);

app.use((req, res, next) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).send(err.message)
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
