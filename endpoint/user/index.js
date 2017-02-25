'use strict';

const User = require('../../models/user');
const requestValidation = require('../../core/validate/request');

//TODO set required params
const login = (req, res) => {
    const response = {};

    User.getDbUser({
        username: req.body.email,
        password: req.body.password,
    }).catch((err) => {
        console.error(err);
        return Promise.reject({ status: 401, text: 'Invalid email or password' });
    }).then((userInfo) => {
        req.session.userUuid = userInfo.uuid;
        req.session.userEmail = userInfo.email;
        response.name = userInfo.name;
        response.role = userInfo.role;
        return response;
    }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(err.status).send(err.text);
    });
};

const create = (req, res) => {
    const response = {};

    User.createDbUser({
        username: req.body.email,
        password: req.body.password,
        name: req.body.name,
    }).then((userInfo) => {
        req.session.userUuid = userInfo.uuid;
        req.session.userEmail = userInfo.email;
        response.name = userInfo.name;
        response.role = userInfo.role;
        res.status(200).send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
};

const logout = (req, res) => {
    delete req.session.userUuid;
    delete req.session.username;
    res.status(200).send({success: true});
};

const state = (req, res) => {
    const response = { username: req.session.username, success: true };

    reminder.getUnread(req.session.userUuid)
        .catch(() => Promise.resolve(null))
        .then((reminders) => (response.reminders = reminders))
        .then(() => res.status(200).send(response));
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
        method: 'post',
        handler: create,
    },
    {
        url: '',
        method: 'get',
        handler: state,
        rules: [requestValidation.loggedIn()],
    },
];

