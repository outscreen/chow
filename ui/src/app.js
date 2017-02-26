'use strict';
require('angular');
require('angular-cloudinary');

angular.module('loi', ['ui.router', 'ngMaterial', 'ngMessages', 'angular-cloudinary']);
require('./controllers');
require('./services');
require('./components');

angular.module('loi').constant('config', require('../config'));

angular.module('loi').run(runModule);
runModule.$inject = ['$rootScope', '$state', 'validate'];
function runModule($rootScope, $state, validate) {
    $rootScope.go = $state.transitionTo;
    $rootScope.stringify = JSON.stringify.bind(JSON);

    $rootScope.validate = (name, field) => {
        const error = validate(name, field.$viewValue);
        field.$setValidity(name, !error);
        field.text = error;
    };

    String.prototype.contains = function(value) { return this.indexOf(value) !== -1; };
}

angular.module('loi').config(appConfig);
appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'cloudinaryProvider', 'config'];
function appConfig($stateProvider, $urlRouterProvider, cloudinaryProvider, config) {
    // Image hosting
    cloudinaryProvider.config({
        upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
        cloud_name: 'doqcot5xu', // required
        upload_preset: 'cjdjzfig', // enable unsigned upload
    });

    const loggedIn = (redirectTo, role) => ($http, $rootScope) => $http.get('/user')
        .then((res) => {
            if (res.status !== 200) return Promise.reject();
            return res.data;
        })
        .then((user) => {
            $rootScope.user = user;
            if (!role || config.roles.permissions[user.role].indexOf(role) !== -1) return user;
            return Promise.reject();
        })
        .catch(() => {
            if (redirectTo) $rootScope.go(redirectTo);
        });

    // Router
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        templateUrl: require('./controllers/posts.html'),
        controller: 'postsCtrl',
        resolve: {
            user: ($http, $rootScope) => $rootScope.user || loggedIn()($http, $rootScope)
        },
    });
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: require('./controllers/login.html'),
        controller: 'loginCtrl',
    });
    $stateProvider.state('registration', {
        url: '/registration',
        templateUrl: require('./controllers/registration.html'),
        controller: 'registrationCtrl',
    });
    $stateProvider.state('add', {
        url: '/add',
        templateUrl: require('./controllers/add.html'),
        controller: 'addCtrl',
    });
    $stateProvider.state('edit', {
        url: '/edit:post',
        templateUrl: require('./controllers/add.html'),
        controller: 'addCtrl',
    });
    $stateProvider.state('my', {
        url: '/my',
        templateUrl: require('./controllers/posts.html'),
        controller: 'postsCtrl',
        resolve: {
            user: loggedIn('login'),
        },
    });
    $stateProvider.state('posts', {
        url: '/posts',
        templateUrl: require('./controllers/posts.html'),
        controller: 'postsCtrl',
        resolve: {
            user: loggedIn('login', config.roles.list.moderator),
        },
    });
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: require('./controllers/users.html'),
        controller: 'usersCtrl',
        resolve: {
            user: loggedIn('login', config.roles.list.admin),
        },
    });
}
