const { response } = require('express')
const request = require('supertest')

const app = require('../server')

describe("GET /getallusersandvenue", () => {
    describe("get all data", () => {
        test('should return the data in JSON format', async () => {
            const response = await request(app)
                .get("/getallusersandvenue")
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })
})

describe("POST /sendvenue", () => {
    describe("add a venue", () => {
        test('should return the data in JSON format', async () => {
            const response = await request(app)
                .post("/sendvenue")
                .send({
                    name: "Venue 1"
                })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('should return a venueid in response', async () => {
            const response = await request(app)
                .post("/sendvenue")
                .send({
                    name: "Venue 1"
                })
            expect(response.body[response.body.length - 1].venueid).toBeDefined()
        })
    })
})

describe("POST /senduser", () => {
    describe("add a user", () => {
        test('should return the data in JSON format', async () => {
            const response = await request(app)
                .post("/senduser")
                .send({
                    name: "User 1"
                })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('should return a userid in response', async () => {
            const response = await request(app)
                .post("/senduser")
                .send({
                    name: "User 1"
                })
            expect(response.body[response.body.length - 1].userid).toBeDefined()
        })

        test('should return name in response', async () => {
            const response = await request(app)
                .post("/senduser")
                .send({
                    name: "User 1"
                })
            expect(response.body[response.body.length - 1].name).toBeDefined()
        })
    })
})