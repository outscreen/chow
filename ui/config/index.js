const isomorphic = require('../../config/isomorphic');

module.exports = Object.assign({}, isomorphic, {
    isDebug: process.env.ENV === 'debug',
    unknownError: 'Unknown error occurred. Please try again later.',
    connectionError: 'Please re-check your internet connection.',
});
