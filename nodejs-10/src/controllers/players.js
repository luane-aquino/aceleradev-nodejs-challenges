const playersModel = require('../models')['players']
const { Op } = require('sequelize')

let Players = {}

Players.getAll = async (req, res, next) => {
  try {
    const { nationality, score } = req.query

    if (nationality) {
      const playersByNationality = await playersModel.findAll({
        where: {
          nationality: {
            [Op.eq]: nationality
          }
        }
      })

      res.status(200).json({
        "total": playersByNationality.length,
        "data": playersByNationality
      })
    } else if (score) {
      const playersByScore = await playersModel.findAll({
        where: {
          score: {
            [Op.gte]: score
          }
        }
      })

      res.status(200).json({
        "total": playersByScore.length,
        "data": playersByScore
      })
    } else {
      const allUsers = await playersModel.findAll()
      res.status(200).json({
        "total": allUsers.length,
        "data": allUsers
      })
    }

  } catch (err) {
    console.log(err)
  }
}

Players.getById = async (req, res, next) => {
  try {
    const { playerId } = req.params
    const player = await playersModel.findOne({
      where: { id: playerId }
    })

    res.status(200).json(player)
  } catch (err) {
    console.log(err)
  }
}

Players.create = async (req, res, next) => {
  try {
    const newPlayer = req.body
    const addedPlayer = await playersModel.create(newPlayer)

    res.status(201).json(addedPlayer)
  } catch (err) {
    console.log(err)
  }
}

Players.update = async (req, res, next) => {
  try {
    const { playerId } = req.params
    const result = await playersModel.update(req.body, {
      where: { id: playerId }
    })

    res.status(200).json({})
  } catch (err) {
    console.log(err)
  }
}

Players.delete = async (req, res, next) => {
  try {
    const { playerId } = req.params
    const result = await playersModel.destroy({
      where: { id: playerId }
    })

    res.status(204).json(result)
  } catch (err) {
    console.log(err)
  }
}

module.exports = Players
