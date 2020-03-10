const request = require('supertest')
const server = require('../src/server')
const {
  cleanDB,
  openDB,
  populateDB
} = require('./utils')

beforeAll(() => cleanDB())

beforeEach(() => {
  populateDB({
    "ANI1580214599567RD121": {
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": "2020-01-28T12:29:59.567Z",
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "color": "Branco Malhado",
      "image_url": ""
    },
    "ANI1580216220549RD493": {
      "created_at": "2020-01-28T12:57:00.550Z",
      "updated_at": "2020-01-28T12:57:00.550Z",
      "pet_name": "Tereza Fernandes Montalvão",
      "description": "Gatinha mais perfeita desse mundão redondo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Fêmea",
      "color": "Malhada",
      "image_url": ""
    }
  })
})

afterEach(() => {
  cleanDB()
})

afterAll(() => cleanDB())

describe('The API on /api/animals Endpoint at GET method should...', () => {
  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.statusCode).toBe(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.body.total).toBe(2)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/api/animals')

    expect(res.body).toMatchObject({
      total: 2,
      data: {
        "ANI1580214599567RD121": {
          "created_at": "2020-01-28T12:29:59.567Z",
          "updated_at": "2020-01-28T12:29:59.567Z",
          "pet_name": "Belchior Fernandes Montalvão",
          "description": "Gatinho mais fofinho desse mundo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Macho",
          "color": "Branco Malhado",
          "image_url": ""
        },
        "ANI1580216220549RD493": {
          "created_at": "2020-01-28T12:57:00.550Z",
          "updated_at": "2020-01-28T12:57:00.550Z",
          "pet_name": "Tereza Fernandes Montalvão",
          "description": "Gatinha mais perfeita desse mundão redondo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Fêmea",
          "color": "Malhada",
          "image_url": ""
        }
      }
    })
  })
})

describe('The API on /api/animals/:id Endpoint at GET method should...', () => {
  test('return status code 200 and an animal of id: ANI1580214599567RD121', async () => {
    const res = await request(server.app).get('/api/animals/ANI1580214599567RD121')

    expect(res.statusCode).toBe(200)
    expect(typeof res.body).toBe('object')
  })

  test('return status code 404 when given a non existing id', async () => {
    const res = await request(server.app).get('/api/animals/ANI1580214599567RD128')

    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBe('The record ANI1580214599567RD128 couldn\'t be found.')
  })
})

describe('The API on /api/animals Endpoint at POST method should...', () => {
  test('return status code 201 and an object representing the animal', async () => {
    const res = await request(server.app).post('/api/animals')
      .send({ "pet_name": "mega" })
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(201)
    expect(typeof res.body).toBe('object')
  })

})

describe('The API on /api/animals/:id Endpoint at PATCH method should...', () => {
  test('return status code 200 and an object representing updated animal', async () => {
    const res = await request(server.app).patch('/api/animals/ANI1580216220549RD493')
      .send({ "pet_name": "Tereza Silva" })
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(200)
    expect(typeof res.body).toBe('object')
  })

  test('return status code 404 and an error message', async () => {
    const res = await request(server.app).patch('/api/animals/ANI1580216220549RD494')
      .send({ "pet_name": "Tereza Silva" })
      .set('Accept', 'application/json')

    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBe('The record ANI1580216220549RD494 couldn\'t be found.')
  })
})

describe('The API on /api/animals/:id Endpoint at DELETE method should...', () => {
  test('return status code 204 for a succesful delete operation', async () => {
    const res = await request(server.app).delete('/api/animals/ANI1580216220549RD493')

    expect(res.statusCode).toBe(204)
  })

  test('return status code 404 and an error message', async () => {
    const res = await request(server.app).delete('/api/animals/ANI1580216220549RD488')

    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBe('The record ANI1580216220549RD488 couldn\'t be found.')
  })

})
