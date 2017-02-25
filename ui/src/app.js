'use strict';

angular.module('loi', ['ui.router', 'ngMaterial', 'ngMessages']);
require('./controllers');
require('./services');

angular.module('loi').run(runModule);
runModule.$inject = ['$rootScope', '$state', 'validate'];
function runModule($rootScope, $state, validate) {
    $rootScope.go = $state.transitionTo;

    $rootScope.validate = (name, field) => {
        const error = validate(name, field.$viewValue);
        field.$setValidity(name, !error);
        field.text = error;
    }
}

angular.module('loi').config(router);
router.$inject = ['$stateProvider', '$urlRouterProvider'];
function router($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        templateUrl: require('./controllers/main.html'),
        controller: 'mainCtrl',
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
}
