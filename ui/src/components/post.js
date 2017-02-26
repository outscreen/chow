angular.module('loi').directive('post', post);
postCtrl.$inject = ['$scope'];
function post() {
    return {
        restrict: 'E',
        replace: true,
        controller: postCtrl,
        templateUrl: require('./post.html'),
        scope: {
            data: '=',
            showStatus: '@'
        },
    };
}

function postCtrl($scope) {

}
