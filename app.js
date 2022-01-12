'use strict';

const express = require('express');

const app = express();

const messages = [];

class Message {
    constructor(text, author) {
        this.text = text;
        this.author = author;
    }
}

// Route is a string an address where on the server this is going

// Callback function - tells route what to do. Requires two parameters (request, response)
app.get('/message', (request,response) => {
    
    console.log('Someone sent a request via ' + request.method);
    // create a message and send it to server from client
    // response.send(messages);
    response.send("message route in app is active");

}); // modifies app singleton




function createMessage(request, response, next) {
    const messageText = request.query.text;
    const authorName = request.query.author;

    if (!messageText || !authorName) {
        next('No text or author');
    } else {
        const message = new Message(messageText, authorName); // creates message
        request.message = message;
        next();

    }
}

function saveMessage( request, response, next ){

    let message = request.message;
    messages.push(message);
    next();
}

// POST -> localhost:3000/message?text=someString&author=Ryan
app.post('/message', createMessage, saveMessage, (request, response, next) => {
    // create a message and send it back
    // const messageText = request.query.text;
    // const authorName = request.query.author;

    // next('an error happen');

    // const message = new Message(messageText, authorName); // creates message
    // messages.push(message);
    response.send(messages);

});

// app.use(function (error, request, response, next) {
//     console.log(error);
//     response.send('ERROR!!!');

// });


app.use(function (request, response) {
    response.status(404).send('nothing appear, 404');
});



// module.exports = app;

module.exports = {
    start: function (port) {
        app.listen(port, () => {
            console.log('App is running on : ' + port);
        });
    }, app,
};