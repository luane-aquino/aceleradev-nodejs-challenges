const fs = require('fs')
const path = require('path')
const ENV = 'test'

const openDB = () => require(`../data/database.${ENV}.json`)

const cleanDB = () => {
  const pathname = path.join(__dirname, `../data/database.${ENV}.json`)
  fs.writeFileSync(pathname, `{}`, 'utf8')
}

const populateDB = (data) => {
  const pathname = path.join(__dirname, `../data/database.${ENV}.json`)

  try {
    fs.writeFileSync(pathname, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.error(err)
  }

}

module.exports = {
  openDB,
  cleanDB,
  populateDB
}
