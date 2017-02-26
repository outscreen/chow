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

const update = (params, allowStatus) => {
    const update = {};

    params.title && (update.title = params.title);
    params.description && (update.description = params.description);
    params.url && (update.url = params.url);
    allowStatus && params.status && (update.status = params.status);

    return db.update(config.db.postsTable, { _id: params._id }, {$set: update})
        .then((res) => Object.assign(res.value, update));
};

const updateStatus = (params) => update(params, true);

module.exports = {
    add,
    get,
    getOne,
    update,
    updateStatus,
};