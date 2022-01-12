"use strict";

function validator(request, response, next) {
    let name = req.body.name;

    if (!name) {
        next("bad request");
    } else {
        next();
    }
}

module.exports = validator;
