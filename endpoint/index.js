'use strict';

module.exports = [
    {
        path: 'user',
        handlers: require('./user'),
    },
    {
        path: 'post',
        handlers: require('./post'),
    },
];

