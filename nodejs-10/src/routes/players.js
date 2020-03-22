const express = require('express')
const router = express.Router()
const controller = require('../controllers/players')

router.get('/', controller.getAll)

router.get('/:playerId', controller.getById)

router.post('/', controller.create)

router.patch('/:playerId', controller.update)

router.delete('/:playerId', controller.delete)

module.exports = router
