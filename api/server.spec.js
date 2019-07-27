const request = require('supertest');
const server = require('../api/server');

describe('../api/server.js', () => {
    describe('main route', () => {
        it('should return a 200 status code from the index route', async () => {
            const statusCode = 200;
            const response = await request(server).get('/')

            expect(response.status).toEqual(statusCode);
        });
        it('should return a JSON object from the index route', async () => {
            const expectedBody = { api: 'Welcome to the Trip Planner API!' };

            const response = await request(server).get('/');

            expect(response.body).toEqual(expectedBody);
        });

        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json');
        })
    })
});