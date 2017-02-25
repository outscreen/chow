'use strict';

angular.module('loi', ['ui.router', 'ngMaterial', 'ngMessages']);
require('./controllers');

angular.module('loi').run(runModule);
runModule.$inject = ['$rootScope', '$state'];
function runModule($rootScope, $state) {
    $rootScope.go = $state.transitionTo;
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
}
