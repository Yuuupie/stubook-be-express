module.exports = (express, app) => {
  const router = express.Router()
  const controller = require('../controller/user.controller')

  // Login user, providing session token upon success
  router.post('/login', controller.login)

  // Register user
  router.post('/', controller.register)

  app.use('/api/user', router)
}

