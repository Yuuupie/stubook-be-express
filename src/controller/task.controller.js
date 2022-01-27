const db = require('../database/index')
const { Sequelize, Op } = require('sequelize')

exports.fetch = async (req, res) => {
  let tasks = await db.task.findAll({
    where: {
      userId: req.session.userId
    }
  })
  res.json({ tasks })
}

exports.create = async (req, res) => {
  try {
    await db.task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      userId: req.session.userId
    })
    res.json({ message: 'Task added successfully' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error occurred' })
  }
}

exports.update = async (req, res) => {
  try {
    await db.task.update({
      title: req.body.title,
      dueDate: req.body.dueDate
    }, {
      where: {
        id: req.body.id
      }
    })
    res.json({ message: 'Task updated successfully' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error occurred' })
  }
}

exports.delete = async (req, res) => {
  try {
    await db.task.destroy({
      where: {
        id: req.body.id
      }
    })
    res.json({ message: 'Task successfully deleted' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error occurred' })
  }
}

