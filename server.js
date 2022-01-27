require('dotenv').config()
const db = require('./src/database')
const express = require('express')
const sessions = require('express-session')

db.sync()

const app = express();
app.use(express.json())
app.use(sessions({ 
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

require('./src/routes/user.routes.js')(express, app)
require('./src/routes/task.routes.js')(express, app)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

