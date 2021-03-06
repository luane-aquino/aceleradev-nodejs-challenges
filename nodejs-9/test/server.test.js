/*
  Que tal implementar os seus próprios testes de integração?
  Não é obrigatório e não terá impacto na nota final do desafio,
  mas fazê-los pode te dar mais certeza na hora de submeter! 
*/

const request = require('supertest')
const { server } = require('../src/server.js')

// Deixamos esses útils aqui pra vcs usarem nos hooks da api do jest
const { populateTable, cleanTable, connection } = require('./utils')

// Lembrando que vc pode usar esses hooks dentro do escopo das describes tbm!
beforeAll(() => {
  /* Quel tal limpar o banco de teste? */
  cleanTable()
})

beforeEach(() => {
  /* O que vc pode fazer ANTES de cada suite de testes ser executada? */
  populateTable()
})

afterEach(() => {
  /* O que vc pode fazer DEPOIS de cada suite de testes ser executada? */
  cleanTable()
})

afterAll(() => {
  /* O que vc pode fazer DEPOIS que todas as suites foram executadas? */
  cleanTable()
})

describe('GET /v1/students should', () => {
  test.only('return status code 200 and all students in json format', async () => {
    const res = await request(server.app).get('/v1/students')

    expect(res.statusCode).toBe(200)
    // expect(Object.keys(res.body)).toMatchObject([
    //   'total',
    //   'data'
    // ])
  })
})

describe('GET /v1/students/:id should', () => {
  // ...
})

describe('POST /v1/students should', () => {
  // ...
})

describe('PATCH /v1/students/:id should', () => {
  // ...
})

describe('DELETE /v1/students/:id should', () => {
  // ...
})
