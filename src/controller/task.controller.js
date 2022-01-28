const db = require('../database/index')

exports.fetch = async (req, res) => {
  let tasks = await db.task.findAll({
    where: {
      userId: req.session.userId
    }, 
    include: db.tag
  })

  res.json({ tasks })
}

exports.create = async (req, res) => {
  try {
    await db.task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      userId: req.session.userId,
      tags: req.body.tags.map((tag) => {
        return {name: tag}
      })
    }, {
      include: [db.tag]
    })
    res.json({ message: 'Task added successfully' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error occurred' })
  }
}

exports.update = async (req, res) => {
  try {
    let newTags = [...req.body.tags]

    // Update 'task' model
    await db.task.update({
      title: req.body.title,
      dueDate: req.body.dueDate
    }, {
      where: {
        id: req.body.id
      }
    })

    // Update 'tag' model
    let currentTags = await db.tag.findAll({
      where: {
        taskId: req.body.id
      }
    })

    await Promise.all(currentTags.map(async (currentTag) => {
      let currentTagName = currentTag.dataValues.name
      if (!(newTags.includes(currentTagName))) {
        await db.tag.destroy({
          where: {
            name: currentTagName,
            taskId: req.body.id
          }
        })
      } else {
        newTags.splice(newTags.indexOf(currentTagName), 1)
      }
    }))

    await Promise.all(newTags.map(async (tag) => {
      await db.tag.create({
        name: tag,
        taskId: req.body.id
      })
    }))

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
    await db.tag.destroy({
      where: {
        taskId: req.body.id
      }
    })
    res.json({ message: 'Task successfully deleted' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error occurred' })
  }
}

