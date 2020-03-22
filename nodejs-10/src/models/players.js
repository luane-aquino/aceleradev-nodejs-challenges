module.exports = (sequelize, DataTypes) =>
  sequelize.define('players', {
    name: {
      type: DataTypes.STRING
    },
    nickname: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    wage: {
      type: DataTypes.INTEGER
    },
    score: {
      type: DataTypes.INTEGER
    }
  })
