'use strict';

const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const config = require('../../config');
const log = require('../helpers/log');
const random = require('../helpers/random');

const uuidLength = 8;

class DataBase {
    constructor() {
        this.ready = new Promise((resolve, reject) => {
            MongoClient.connect(config.db.connectionUri, (err, dbInstance) => {
                if (err) {
                    log.error("MONGO");
                    return reject(err);
                }
                log("MONGO: success");
                this.db = dbInstance;
                resolve(this);
            });
        });
    }

    create(collection, params) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).insert(params, (err, res) => {
                if (err) {
                    log.error(err);
                    return reject('Already exists');
                }
                return resolve(res);
            });
        });
    }

    generateUuid(collection) {
        return new Promise((resolve, reject) => {
            const uuid = random.alphaNumeric(uuidLength);
            return this.getOne(collection, {uuid})
                .then((found) => {
                    //  If no such uuid yet, resolve. Otherwise retry
                    if (!found) return resolve(uuid);
                    return this.generateUuid(collection);
                })
                .catch((err) => reject(err));
        });
    }

    get(collection, params) {
        if (params._id) params._id = MongoDB.ObjectID(params._id);
        return new Promise((resolve, reject) => {
            this.db.collection(collection)
                .find(params)
                .toArray((err, docs) => {
                    if (err) {
                        log.error(err);
                        return reject(err);
                    }
                    return resolve(docs);
                });
        });
    }

    update(collection, params, update, upsert) {
        if (params._id) params._id = MongoDB.ObjectID(params._id);
        return this.db.collection(collection).findOneAndUpdate(params, update, { upsert });
    }

    getOne(collection, params) {
        if (params._id) params._id = MongoDB.ObjectID(params._id);
        return new Promise((resolve, reject) => {
            this.db.collection(collection)
                .findOne(params, (err, doc) => {
                    if (err) {
                        log.error(err);
                        return reject(err);
                    }
                    return resolve(doc);
                });
        });
    }
}

module.exports = new DataBase();
