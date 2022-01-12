'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Validator should validate.', () => {

    it('Validator should check for a name.', async () => {
        // let response = await request.post('/person?name=test');

        // expect(response.status).toEqual(200);
        // expect(response.body[0].name).toEqual('test');
    })
})