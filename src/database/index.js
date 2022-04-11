require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const db = {}

db.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
})

db.user = require('./models/user.model.js')(db.sequelize, DataTypes)
db.task = require('./models/task.model.js')(db.sequelize, DataTypes)
db.tag = require('./models/tag.model.js')(db.sequelize, DataTypes)

db.tag.removeAttribute('id')

// user-to-task is one-to-many
db.user.hasMany(db.task)
db.task.belongsTo(db.user)

// task-to-tag is one-to-many
db.task.hasMany(db.tag)
db.tag.belongsTo(db.task)

db.sync = async () => {
  await db.sequelize.sync({ force: true })
  await seedData()
}

const seedData = async () => {
  await db.user.create({ id: 1, username: 'dummy', password: 'pass' })
  await db.user.create({ id: 2, username: 'dummy two', password: 'pass two' })
  await db.task.create({ id: 1, title: 'dummy task', dueDate: '2022-01-20', userId: 1 })
  await db.task.create({ id: 2, title: 'dummy task two', dueDate: '2022-02-20', userId: 2 })
  await db.task.create({ id: 3, title: 'dummy task three', dueDate: '2022-02-20', userId: 2 })
  await db.tag.create({ taskId: 1, name: 'tag one' })
  await db.tag.create({ taskId: 2, name: 'tag two' })
  await db.tag.create({ taskId: 2, name: 'tag three' })
}

module.exports = db

