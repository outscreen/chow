'use strict';

const roles = {
    default: 'user',
    list: {
        admin: 'admin',
        moderator: 'moderator',
        user: 'user',
    },
    permissions: {
        admin: {
            extends: ['moderator'],
        },
        moderator: {
            extends: ['user'],
        },
        user: {
            extends: [],
        },
    },
};

const addNested = (target, toAdd) => {
    if (!roles.permissions[target].extends || !roles.permissions[target].extends.length) return;
    if (!roles.permissions[toAdd].extends || !roles.permissions[toAdd].extends.length
        && roles.permissions[target].extends.indexOf(toAdd) === -1) roles.permissions[target].extends.push(toAdd);
    roles.permissions[toAdd].extends.forEach((nested) => addNested(target, nested));
};

Object.keys(roles.permissions).forEach((roleName) => {
    if (roles.permissions[roleName].extends) {
        roles.permissions[roleName].extends.forEach((nested) => addNested(roleName, nested));
    }
    const permissions = roles.permissions[roleName].extends || [];
    permissions.push(roleName);
    roles.permissions[roleName] = permissions;
});

module.exports = roles;
