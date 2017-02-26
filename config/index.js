'use strict';

const isomorphic = require('./isomorphic');

const config = Object.assign({}, isomorphic, {
    db: {
        // TODO remove hardcode
        connectionUri: process.env.dbUrl,
        usersTable: 'users',
        sessionsTable: 'sessions',
        postsTable: 'posts',
        posts: 'posts',
    },
});

module.exports = config;