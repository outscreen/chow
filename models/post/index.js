const db = require('../../core/db');
const config = require('../../config');

const add = (params) => db.create(config.db.postsTable, {
    status: config.status.pending,
    userUuid: params.userUuid,
    title: params.title,
    description: params.description,
    url: params.url,
});

const get = (params) => db.get(config.db.postsTable, params);

const getOne = (params) => db.getOne(config.db.postsTable, params);

const update = (params) => {
    const update = {};

    params.status && (update.status = params.status);
    params.title && (update.title = params.title);
    params.description && (update.description = params.description);
    params.url && (update.url = params.url);

    return db.update(config.db.remindersTable, { _id: params._id }, {$set: update})
        .then((res) => Object.assign(res.value, update));
};

module.exports = {
    add,
    get,
    getOne,
    update,
};