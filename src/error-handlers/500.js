`use strict`;

// for 500 level errors, not the user, or db fault
// server errors

function serverError(error, request, response, next) {
    console.error('Server error.');
    response.status(500).send('Server is having an error.');
}

module.exports = serverError;