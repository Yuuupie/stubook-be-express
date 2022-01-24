module.exports = (express, app) => {
  const router = express.Router()
  const controller = require('../controller/user.controller')

  router.post('/login', controller.login)

  app.use('/api/user', router)
}

