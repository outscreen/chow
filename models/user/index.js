'use strict';

const hash = require('../../core/helpers/hash');
const db = require('../../core/db');
const config = require('../../config');


class User {
    constructor(params) {
        this.username = params.username;
        this.hash = params.password ? hash(params.password) : params.hash;
        this.role = params.role || config.roles.default;
        this.uuid = params.uuid;
        this.name = params.name;
    }

    static createDbUser(params) {
        // TODO validate params
        params.hash = params.password ? hash(params.password) : params.hash;
        delete params.password;

        params.role = params.role || 'user';

        return db.getOne(config.db.usersTable, { username: params.username })
            .then((existingUser) => {
                if (existingUser) return Promise.reject(`User ${params.username} already exists`);

                return db.generateUuid(config.db.usersTable).then((uuid) => {
                    params.uuid = uuid;
                    return db.create(config.db.usersTable, params).then(() => new User(params));
                });
            });
    }

    static updateDbUser(search, params, create) {
        if (search.password) search.hash = hash(search.password);
        delete search.password;

        return db.getOne(config.db.usersTable, search)
            .then((existingUser) => {
                if (existingUser) {
                    return db.update(config.db.usersTable, search,
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
        if (params.password) params.hash = hash(params.password);
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

    static getDbUsers(params) {
        return db.get(config.db.usersTable, params).then((users) => users.map((user) => new User(user)));
    }
}

module.exports = User;
