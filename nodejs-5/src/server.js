const express = require('express')
const app = express()
const movies = require('../imdb-movies.json')

const randNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

app.get('/v1/movie', async (req, res, next) => {
  const rand = randNumber(0, movies.length - 1)
  const director = movies[rand].Director
  const movie = movies[rand].Title

  res.status(200).send({ director, movie })
})

app.get('/v1/movie/:director', async (req, res, next) => {
  const selectedDirector = req.params.director
  const filteredList = movies.filter(movie => {
    return movie.Director === selectedDirector
  })
  if (filteredList.length !== 0) {
    const rand = randNumber(0, filteredList.length - 1)
    const director = filteredList[rand].Director
    const movie = filteredList[rand].Title

    res.status(200).send({ director, movie })
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
