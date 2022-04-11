const path = require('path')
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: path.join(__dirname, '/.env.production') })
} else {
  require('dotenv').config()
}

const express = require('express')
const sessions = require('express-session')
const cors = require('cors')
const fs = require('fs')
const yaml = require('js-yaml')
const https = require('https')
const db = require('./src/database')

// Sync mariadb tables with sequelize models in src/, and seed data with dummy values
db.sync()

const secrets = yaml.load(fs.readFileSync("secrets.yml"))

const app = express();
app.use(express.json())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(sessions({ 
  secret: secrets.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

require('./src/routes/user.routes.js')(express, app)
require('./src/routes/task.routes.js')(express, app)

// Load SSL for prod
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/yuuupie.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/yuuupie.xyz/cert.pem')
  }

  https.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  })

} else {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}


