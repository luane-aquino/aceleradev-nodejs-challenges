module.exports = (sequelize, DataTypes) =>
  sequelize.define('teams', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    coach: {
      type: DataTypes.STRING
    },
    shieldUrl: {
      type: DataTypes.STRING
    },
    birthYear: {
      type: DataTypes.INTEGER
    }
  })
