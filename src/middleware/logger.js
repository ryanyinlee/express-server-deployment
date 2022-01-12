'use strict'

function logger(request, response, next) {

    console.log("Request path: " + request.path);
    console.log("Request method: " +  request.method);
    
    next();
}


module.exports = logger;