module.exports = (sequelize, DataTypes) =>
  sequelize.define('tag', {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, { timestamps: false })

