module.exports = (express, app) => {
  const router = express.Router()
  const controller = require('../controller/task.controller')

  router.get('/', controller.fetch)

  router.post('/create', controller.create)

  router.put('/update', controller.update)

  router.delete('/delete', controller.delete)

  app.use('/api/task', (req, res, next) => {
    if (req.session.userId === undefined) {
      res.json({ message: 'Not logged in' })
    } else {
      next()
    }
  }, router)
}
