module.exports = (express, app) => {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send('h')
  })

  app.use('/api/user', router)
}

