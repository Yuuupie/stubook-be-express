require('dotenv').config()
const db = require('./src/database')
const express = require('express')

db.sync()

const app = express();
app.use(express.json())

require('./src/routes/user.routes.js')(express, app)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

