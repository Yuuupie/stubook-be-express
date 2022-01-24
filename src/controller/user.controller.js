const db = require('../database/index')

exports.login = async (req, res) => {
  let account = await db.user.findOne({
    where: {
      username: req.body.username
    }
  })

  if (account === null || account.password !== req.body.password) {
    res.status(401).end()
  } else {
    res.status(200).end()
  }
}
