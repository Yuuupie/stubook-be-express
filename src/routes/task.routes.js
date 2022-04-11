module.exports = (express, app) => {
  const router = express.Router()
  const controller = require('../controller/task.controller')

  // Fetch tasks
  router.get('/', controller.fetch)

  // Create task
  router.post('/', controller.create)

  // Update task
  router.put('/', controller.update)

  // Delete task
  router.delete('/', controller.delete)

  // Check for session token before processing request
  app.use('/api/task', (req, res, next) => {
    if (req.session.userId === undefined) {
      res.json({ message: 'Not logged in' })
    } else {
      next()
    }
  }, router)
}
