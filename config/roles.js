'use strict';

const roles = {
    default: 'user',
    admin: {
        extends: ['moderator'],
    },
    moderator: {
        extends: ['user'],
    },
    user: {
        extends: [],
    },
};

const addNested = (target, toAdd) => {
    if (!roles[target].extends || !roles[target].extends.length) return;
    if (!roles[toAdd].extends || !roles[toAdd].extends.length
        && roles[target].extends.indexOf(toAdd) === -1) roles[target].extends.push(toAdd);
    roles[toAdd].extends.forEach((nested) => addNested(target, nested));
};

Object.keys(roles).forEach((roleName) => {
    roles[roleName].extends && roles[roleName].extends.length
    && roles[roleName].extends.forEach((nested) => addNested(roleName, nested))
});

module.exports = roles;