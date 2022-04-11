const db = require('../database/index')

/**
 * Retrieve all tasks belonging to the logged in user
 */
exports.fetch = async (req, res) => {
  let tasks = []

  // Get task records
  let taskRecords = await db.task.findAll({
    where: {
      userId: req.session.userId
    },
    attributes: {
      exclude: ['userId']
    }
  })

  // Retrieve and map tags to their tasks
  await Promise.all(taskRecords.map(async (taskRecord) => {
    let task = taskRecord.dataValues
    let tagRecords = await db.tag.findAll({
      where: {
        taskId: task.id
      },
      attributes: ['name']
    })
    let tags = tagRecords.map((tagRecord) => {
      return tagRecord.name
    })
    tasks.push({ ...task, tags})
  }))

  res.json({ tasks })
}

/**
 * Create task
 */
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

/**
 * Update task. 
 *
 * For instances where tags are updated, the SQL records with the old tag names are deleted and new records with the new tag names are created.
 */
exports.update = async (req, res) => {
  try {
    let newTags = [...req.body.tags]

    // Update 'task' table
    await db.task.update({
      title: req.body.title,
      dueDate: req.body.dueDate
    }, {
      where: {
        id: req.body.id
      }
    })

    let currentTags = await db.tag.findAll({
      where: {
        taskId: req.body.id
      }
    })

    // Delete tags that no longer exist (either deleted or renamed)
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

    // Add new tags (including updated ones)
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

/**
 * Delete task
 */
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

