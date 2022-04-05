require('dotenv').config()
const db = require('./src/database')
const express = require('express')
const sessions = require('express-session')
const cors = require('cors')
const fs = require('fs')
const https = require('https')

db.sync()

const app = express();
app.use(express.json())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(sessions({ 
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

require('./src/routes/user.routes.js')(express, app)
require('./src/routes/task.routes.js')(express, app)

//app.listen(process.env.PORT, () => {
//  console.log(`Server running on port ${process.env.PORT}`)
//})

const options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}

https.createServer(options, app).listen(process.env.PORT, () => {
  console.log("Express server listening on port " + process.env.PORT);
});

