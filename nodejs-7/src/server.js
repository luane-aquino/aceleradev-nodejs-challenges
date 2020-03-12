const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { animals } = require('./model/')

app.use(bodyParser.json())

app.get('/v1/animals', async (req, res, next) => {
  try {
    const data = await animals.findAll()
    res.status(200).json({
      total: data.length,
      data: data
    })
  } catch (err) {
    console.error('error: ', err)
  }
})

app.get('/v1/animals/:animalId', async (req, res, next) => {
  try {
    const { animalId } = req.params
    const animal = await animals.findOne({
      where: { id: animalId }
    })
    res.status(200).json(animal)
  } catch (err) {
    console.error('error: ', err)
  }
})

app.post('/v1/animals', async (req, res, next) => {
  try {
    const data = await animals.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    console.error('error: ', err)
  }
})

app.patch('/v1/animals/:animalId', async (req, res, next) => {
  try {
    const { animalId } = req.params
    const animal = req.body
    await animals.update(animal, {
      where: { id: animalId }
    })
    res.status(200).json({})
  } catch (err) {
    console.error('error: ', err)
  }
})

app.delete('/v1/animals/:animalId', async (req, res, next) => {
  try {
    const { animalId } = req.params
    await animals.destroy({
      where: { id: animalId }
    })
    res.status(204).end()
  } catch (err) {
    console.error('error: ', err)
  }
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}

module.exports = {
  app,
  start,
  stop
}
