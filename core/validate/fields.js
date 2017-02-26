'use strict';

const validate = require('validate.js');
const config = require('../../config');

const username = {
    presence: true,
    format: {
        pattern: /^[a-zA-Z0-9]*$/,
        message: 'should contain only digits or latin letters',
    },
    length: {
        minimum: 4,
        maximum: 20,
        tooShort: "needs to be at least 4 characters long",
    }
};

const name = {
    presence: true,
    length: {
        minimum: 4,
        maximum: 50,
        tooShort: "needs to be at least 4 characters long",
        tooLong: "needs to be up to 50 characters",
    }
};

const password = {
    presence: true,
    length: {
        minimum: 6,
        maximum: 20,
        tooShort: "needs to be at least 6 characters long",
    }
};

const url = {
    format: {
        pattern: new RegExp('^((((H|h)(T|t)|(F|f))(T|t)(P|p)((S|s)?))\://)?(www.|[a-zA-Z0-9].)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\:[0-9]{1,5})*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$'),
    },
    length: {
        maximum: 500,
    }
};

const description = {
    length: {
        minimum: 3,
        maximum: 255,
        tooShort: "needs to be at least 3 characters long",
        tooLong: ": maximum size is 255",
    }
};

const title = {
    length: {
        minimum: 3,
        maximum: 100,
        tooShort: "needs to be at least 3 characters long",
        tooLong: ": maximum size is 100",
    }
};

const email = {
    presence: true,
    format: {
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: 'Should be a valid email address',
    },
    length: {
        maximum: 100,
        tooLong: "Email should be up to 100 characters",
    }
};

const role = {
    presence: true,
    inclusion: {
        within: Object.keys(config.roles.list).map((k) => config.roles.list[k]),
    }
};

module.exports = {
    username,
    password,
    email,
    name,
    title,
    description,
    role,
};