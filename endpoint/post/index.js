'use strict';

const post = require('../../models/post');

//TODO set required params
const add = (req, res) => {
    post.add({
        userUuid: req.session.userUuid,
        url: req.body.url,
        title: req.body.title,
        description: req.body.description,
    }).then(() => {
        res.status(200).send('OK');
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
    })
};

const update = (req, res) => {
    post.getOne({ _id: req.params.id })
        .then((postData) => {
            if (postData.userUuid !== req.session.userUuid) {
                return Promise.reject({status: 401, text: 'Unauthorized'});
            }
        })
        .then(() => post.update(req.body))
        .then(() => res.status(200).send('OK'))
        .catch((err) => {
            console.error(err);
            if (err.status && err.text) return res.status(err.status).send(err.text);
            return res.status(500).send('Please try again later');
        })
};

const get = (req, res) => {
    const params = {};
    req.query.status && (params.status = req.query.status);
    req.query.user && (params.userUuid = req.query.user);
    post.get(params)
        .then((posts) => res.status(200).send(posts))
        .catch((err) => {
            console.error(err);
            if (err.status && err.text) return res.status(err.status).send(err.text);
            return res.status(500).send('Please try again later');
        });
};

module.exports = [
    {
        url: '',
        method: 'post',
        handler: add,
    },
    {
        url: '',
        method: 'get',
        handler: get,
    },
    {
        url: ':id',
        method: 'put',
        handler: update,
    },
];

