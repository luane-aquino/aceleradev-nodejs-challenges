const Sequelize = require('sequelize')
const path = require('path')
const db = {}

const sequelize = new Sequelize(
  'codenation', // DB Name
  'root', // DB User
  '1234', // DB Password
  {
    host: 'localhost', // DB Host
    port: 3306, // DB Port
    dialect: 'mysql'
  }
)

// testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const animals = sequelize.import(
  path.join(__dirname, 'animals.js')
)
console.log(animals.name)
db[animals.name] = animals

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db