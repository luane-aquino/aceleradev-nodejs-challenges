const teamsModel = require('../models')['teams']
const playersModel = require('../models')['players']

let Teams = {}

Teams.getAll = async (req, res, next) => {
  try {
    const allTeams = await teamsModel.findAll({
      include: playersModel
    })

    res.status(200).json({
      "total": allTeams.length,
      "data": allTeams
    })
  } catch (err) {
    console.log(err)
  }
}

Teams.getById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const data = await teamsModel.findOne({
      where: {
        id: teamId
      },
      include: playersModel
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}

Teams.getTeamPlayers = async (req, res, next) => {
  try {
    const { teamId } = req.params
    const teamData = await teamsModel.findOne({
      where: { id: teamId },
      include: playersModel
    })

    res.status(200).json({
      "total": teamData.players.length,
      "data": teamData.players
    })
  } catch (err) {
    console.log(err)
  }
}

Teams.create = async (req, res, next) => {
  try {
    const newTeam = req.body
    const addedTeam = await teamsModel.create(newTeam)

    res.status(201).json(addedTeam)
  } catch (error) {
    res.status(400).json({ error })
  }
}

Teams.update = async (req, res, next) => {
  try {
    const { teamId } = req.params
    const result = await teamsModel.update(req.body, {
      where: { id: teamId }
    })

    res.status(200).json({})
  } catch (err) {
    console.log(err)
  }
}

Teams.delete = async (req, res, next) => {
  try {
    const { teamId } = req.params
    const result = await teamsModel.destroy({
      where: { id: teamId }
    })

    res.status(204).end()
  } catch (err) {
    console.log(err)
  }
}

module.exports = Teams
