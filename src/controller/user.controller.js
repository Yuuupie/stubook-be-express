const db = require('../database/index')
const { Sequelize } = require('sequelize')

/**
 * Looks for account with passed in parameters username and password, and returns session token if successful
 */
exports.login = async (req, res) => {
  let account = await db.user.findOne({
    where: {
      username: req.body.username
    }
  })

  if (account === null || account.password !== req.body.password) {
    res.status(401).json({ message: 'Incorrect credentials' })
  } else {
    req.session.userId = account.id
    res.json({ message: 'Login Successful' })
  }
}

/**
 * Creates account with passed in parameters username and password. Throws error if account with username already exists.
 */
exports.register = async (req, res) => {
  try {
    await db.user.create({ username: req.body.username, password: req.body.password })
    res.json({ message: 'Registration successful' })
  } catch (e) {
    if (e instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({ message: 'Username already exists' })
    } else {
      res.status(400).json({ message: 'Unknown error' })
    }
  }
}

