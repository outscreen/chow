'use strict';

const validate = require('validate.js');
const validationRules = require('./fields');

const loggedIn = () => (req) => {
    if (req.session.userUuid) return;
    return { status: 401, error: 'User must be logged in' }
};

const fieldsPresent = (fields) => (req) => {
    const missing = fields.find((key) => !req.body[key]);
    if (!missing) return;
    return { status: 400, error: {[missing] : `${missing} can't be blank`}, };
};

const fieldsValid = (fields) => (req) => {
    const constraints = {};
    fields.forEach((key) => (constraints[key] = validationRules[key]));
    const error = validate(req.body, constraints);
    if (!error) return;
    return { status: 400, error, };
};

module.exports = {
    loggedIn,
    fieldsValid,
    fieldsPresent,
};