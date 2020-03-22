const jwt = require('jsonwebtoken')
const { auth } = require('../config')

module.exports = (req, res, next) => {
  const token = req.get('x-auth-token')

  jwt.verify(token, auth.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ "error": "Invalid token." })
    } else {
      next()
    }
  })
}
