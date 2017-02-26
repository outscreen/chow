'use strict';

const User = require('../../models/user');
const config = require('../../config');
const requestValidation = require('../../core/validate/request');

//TODO set required params
const login = (req, res) => User.getDbUser({
    username: req.body.email,
    password: req.body.password,
}).catch((err) => {
    console.error(err);
    return Promise.reject({status: 401, text: 'Invalid email or password'});
}).then((userInfo) => {
    req.session.userUuid = userInfo.uuid;
    req.session.userRole = userInfo.role;
    req.session.userName = userInfo.name;
    res.status(200).send({
        uuid: req.session.userUuid,
        role: req.session.userRole,
        name: req.session.userName,
    });
}).catch((err) => {
    res.status(err.status).send(err.text);
});

const create = (req, res) => User.createDbUser({
    username: req.body.email,
    password: req.body.password,
    name: req.body.name,
}).then((userInfo) => {
    req.session.userUuid = userInfo.uuid;
    req.session.userRole = userInfo.role;
    req.session.userName = userInfo.name;
    res.status(200).send({
        uuid: req.session.userUuid,
        role: req.session.userRole,
        name: req.session.userName,
    });
}).catch((err) => {
    res.status(400).send(err);
});

const logout = (req, res) => {
    delete req.session.userUuid;
    delete req.session.userRole;
    delete req.session.userName;
    res.status(200).send({success: true});
};

const state = (req, res) => {
    res.status(200).send({
        uuid: req.session.userUuid,
        role: req.session.userRole,
        name: req.session.userName,
    });
};

const getAll = (req, res) => {
    User.getDbUsers({})
        .then((users) => res.status(200).send(users))
        .catch((err) => {
            console.error(err);
            if (err.status && err.text) return res.status(err.status).send(err.text);
            return res.status(500).send('Please try again later');
        });
};

const role = (req, res) => {
    User.updateDbUser({
        uuid: req.params.id,
    }, {
        role: req.body.role,
    })
        .then(() => res.status(200).send('OK'))
        .catch((err) => {
            console.error(err);
            if (err.status && err.text) return res.status(err.status).send(err.text);
            return res.status(500).send('Please try again later');
        });
};

module.exports = [
    {
        url: 'login',
        method: 'post',
        handler: login,
        // do not validate fields to allow old users log in if validation rules change
        rules: [requestValidation.fieldsPresent(['email', 'password'])],
    },
    {
        url: '',
        method: 'post',
        handler: create,
        rules: [requestValidation.fieldsValid(['email', 'password', 'name'])],
    },
    {
        url: 'logout',
        method: 'get',
        handler: logout,
    },
    {
        url: '',
        method: 'get',
        handler: state,
        rules: [requestValidation.loggedIn()],
    },
    {
        url: 'all',
        method: 'get',
        handler: getAll,
        rules: [requestValidation.role(config.roles.list.moderator)],
    },
    {
        url: 'role/:id',
        method: 'put',
        handler: role,
        rules: [requestValidation.role(config.roles.list.admin), requestValidation.fieldsValid(['role'])],
    },
];

