'use strict';

const isomorphic = require('./isomorphic');

const config = Object.assign({}, isomorphic, {
    db: {
        // TODO remove hardcode
        connectionUri: 'mongodb://uttcvifeomspiap:gUyBLbw1rZiaHRVDjaU6@bstf7r0betva4zy-mongodb.services.clever-cloud.com:27017/bstf7r0betva4zy',
        usersTable: 'users',
        sessionsTable: 'sessions',
        postsTable: 'posts',
        posts: 'posts',
    },
});

module.exports = config;