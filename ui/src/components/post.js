angular.module('loi').directive('post', post);
postCtrl.$inject = ['$scope'];
function post() {
    return {
        restrict: 'E',
        replace: true,
        controller: postCtrl,
        templateUrl: require('./post.html'),
        scope: {
            post: '=',
            showStatus: '@',
            mode: '@'
        },
    };
}

function postCtrl($scope) {
}
