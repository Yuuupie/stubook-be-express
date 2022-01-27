module.exports = (express, app) => {
  const router = express.Router()
  const controller = require('../controller/task.controller')

  router.get('/', controller.fetch)

  router.post('/', controller.create)

  router.put('/', controller.update)

  router.delete('/', controller.delete)

  app.use('/api/task', (req, res, next) => {
    if (req.session.userId === undefined) {
      res.json({ message: 'Not logged in' })
    } else {
      next()
    }
  }, router)
}
