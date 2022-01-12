`use strict`;

// const { response } = require('express');
const express = require('express');
const dotenv = require('dotenv');
const app = express();

const logger = require('./middleware/logger.js');
const notFound = require('./error-handlers/404.js');
const serverError = require('./error-handlers/500.js');

app.get('/', (request, response) => {
    console.log("hitting the home route with " + request.method);
    response.send('hitting the home route');
});

const persons = [];

class Person {
    constructor(name) {
        this.name = name;
    }
}

// Person Route: Expects a query string from the user with a “name” property

// When present, output JSON to the client with this shape: { name: "name provided" }

// Without a name in the query string, force a “500” error
app.get('/person', (request, response) => {

    console.log('The person route was hit via ' + request.method);

    response.send(persons)
    
})


function createPerson(request, response, next) {
    const personName = request.query.name;
    
    if (!personName) {
        next('No name entered');
    } else {
        const person = new Person(personName); // creates Person
        request.person = person;
        next();

    }
}

function savePerson( request, response, next ){

    let person = request.person;
    persons.push(person);
    next();
}

// POST -> localhost:3000/person?name=testybob
app.post('/person', createPerson, savePerson, (request, response, next) => {
    response.send(persons);
    console.log("post route hit for /postperson with " + JSON.stringify(persons));

});


app.use(logger);
app.use(notFound);

// Make sure error handlers are below any middleware that would trigger next();
app.use(serverError);

module.exports = {
    start: (port) => {
        app.listen(port, () => {
            console.log('Server is listening on port: ' + port);
        });        
    }, app,
};