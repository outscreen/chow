'use strict';

const hash = require('../../core/helpers/hash');
const db = require('../../core/db');
const config = require('../../config');


class User {
    constructor(params) {
        this.username = params.username;
        this.hash = params.password ? hash(params.password) : params.hash;
        this.email = params.email;
        this.role = params.role;
        this.uuid = params.uuid;
    }

    static createDbUser(params) {
        // TODO validate params
        params.hash = params.password ? hash(params.password) : params.hash;
        delete params.password;

        return db.getOne(config.db.usersTable, { username: params.username })
            .then((existingUser) => {
                if (existingUser) return Promise.reject(`User ${params.username} already exists`);

                return db.generateUuid(config.db.usersTable).then((uuid) => {
                    params.uuid = uuid;
                    return db.create(config.db.usersTable, params).then(() => new User(params));
                });
            });
    }

    static updateDbUser(params, create) {
        // TODO validate params
        params.hash = params.password ? hash(params.password) : params.hash;
        delete params.password;

        return db.getOne(config.db.usersTable, { username: params.username })
            .then((existingUser) => {
                if (existingUser) {
                    return db.update(config.db.usersTable, { username: params.username },
                        { $set: params }).then(() => new User(params));
                }

                if (!create) return Promise.reject('No such user');

                return db.generateUuid(config.db.usersTable).then((uuid) => {
                    params.uuid = uuid;
                    return db.create(config.db.usersTable, params).then(() => new User(params));
                });
            });
    }

    static getDbUser(params, create) {
        params.hash = params.password ? hash(params.password) : params.hash;
        delete params.password;

        // If only user id passed, try getting the user from db
        const searchParams = typeof params === 'string' ? { uuid: params } : params;

        return db.getOne(config.db.usersTable, searchParams).then((user) => {
            if (!user) {
                return create ? User.createDbUser(params) : Promise.reject('No such user');
            }
            return Promise.resolve(new User(user));
        });
    }
}

module.exports = User;
