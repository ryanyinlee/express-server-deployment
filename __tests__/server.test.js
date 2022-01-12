'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Testing the postabilitys! (200 and name in query string)', () => {

    it('Should be able to response to a POST to /person, get back 200 and name is in query string.', async () => {
        let response = await request.post('/person?name=test');

        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('test');
    })
})


describe('Testing the 404 for routes!', () => {

    it('Should give a 404 on a bad route.', async () => {
        let response = await request.get('/fakeroute?name=test');

        expect(response.status).toEqual(404);
        
    })
})


describe('Testing the 404 for bad methods!', () => {

    it('Should give a 404 on a bad method.', async () => {
        let response = await request.delete('/person?name=test');

        expect(response.status).toEqual(404);
        
    })
})

describe('Testing the 500 for no name!', () => {

    it('Should give a 500 with no name in the query.', async () => {
        let response = await request.post('/person?name=');

        expect(response.status).toEqual(500);
        
    })
})

