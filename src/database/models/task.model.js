module.exports = (sequelize, DataTypes) =>
  sequelize.define('task', {
    title: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE
    }
  }, { timestamps: false })
