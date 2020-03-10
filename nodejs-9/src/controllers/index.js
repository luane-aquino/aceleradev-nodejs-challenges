const NODE_ENV = process.env.NODE_ENV || 'production'
const table = `students_${NODE_ENV}`

// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const getAll = async (req, res) => {
  try {
    const query = `SELECT * FROM ${table};`
    res.status(200).json(await queryHelper(query))
  } catch (err) {
    res.send(err)
  }
}

const getById = async (req, res) => {
  try {
    const { studentId } = req.params
    const query = `SELECT * FROM ${table} WHERE id=${studentId};`
    res.status(200).json(await queryHelper(query))
  } catch (err) {
    res.send(err)
  }
}

const create = async (req, res) => {
  try {
    const { columns, values } = insertFormatter(req.body)
    const query = `INSERT INTO ${table} (${columns}) VALUES (${values});`

    const { affectedRows } = await queryHelper(query)
    if (affectedRows) {
      res.status(201).json({ success: 'A new record has been created.' })
    }
  } catch (err) {
    res.send(err)
  }
}

const updateById = async (req, res) => {
  try {
    const { studentId } = req.params
    const updatedData = updateFormatter(req.body)
    const query = `UPDATE ${table} SET ${updatedData} WHERE id=${studentId};`

    const { affectedRows } = await queryHelper(query)

    if (affectedRows) {
      res.status(200).json({ success: 'The record has been updated.' })
    }
  } catch (err) {
    res.send(err)
  }
}

const deleteById = async (req, res) => {
  try {
    const { studentId } = req.params
    const query = `DELETE FROM ${table} WHERE id=${studentId};`
    const { affectedRows } = await queryHelper(query)

    if (affectedRows) {
      res.status(204).json({})
    }
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
