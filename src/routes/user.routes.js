module.exports = (express, app) => {
  const router = express.Router()
  const controller = require('../controller/user.controller')

  router.post('/login', controller.login)

  router.post('/', controller.register)

  app.use('/api/user', router)
}

