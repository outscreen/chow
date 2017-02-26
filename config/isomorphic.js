'use strict';

const roles = require('./roles');

const config = {
    status: {
        pending: 'PENDING',
        approved: 'APPROVED',
        rejected: 'REJECTED',
    },
    roles
};

module.exports = config;
