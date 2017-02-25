'use strict';

module.exports = [
    {
        path: 'user',
        handlers: require('./user'),
    },
    {
        path: 'reminder',
        handlers: require('./reminder'),
    },
];

