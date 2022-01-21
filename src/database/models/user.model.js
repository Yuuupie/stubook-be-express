module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
    username: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, { timestamps: false })

