'use strict';

const generate = (possible, length) => {
    let result = '';

    for (var i = 0; i < length; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
};

const alphaNumeric = (length) => {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    return generate(possible, length);
};

module.exports = {
    alphaNumeric,
};
