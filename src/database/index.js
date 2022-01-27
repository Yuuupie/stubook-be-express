require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const db = {}

db.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { 
  host: process.env.DB_HOST, 
  dialect: process.env.DB_DIALECT 
})

db.user = require('./models/user.model.js')(db.sequelize, DataTypes)
db.task = require('./models/task.model.js')(db.sequelize, DataTypes)

db.user.hasMany(db.task)
db.task.belongsTo(db.user)

db.sync = async () => {
  await db.sequelize.sync({ force: true })
  await seedData()
}

const seedData = async () => {
  await db.user.create({ user_id: 1, username: 'dummy', password: 'pass' })
  await db.user.create({ user_id: 2, username: 'dummy two', password: 'pass two' })
  await db.task.create({ task_id: 1, title: 'dummy task', dueDate: '2022-01-20 10:49:28', userId: 1 })
  await db.task.create({ task_id: 2, title: 'dummy task two', dueDate: '2022-02-20 10:49:28', userId: 2 })
}

module.exports = db

