angular.module('loi').directive('post', post);
postCtrl.$inject = ['$scope', '$rootScope', '$http', 'config', '$window'];
function post() {
    return {
        restrict: 'E',
        replace: true,
        controller: postCtrl,
        templateUrl: require('./post.html'),
        scope: {
            post: '=',
            mode: '@'
        },
    };
}

function postCtrl($scope, $rootScope, $http, config, $window) {
    $scope.go = $rootScope.go;
    $scope.stringify = $rootScope.stringify;

    $scope.approved = config.status.approved;
    $scope.rejected = config.status.rejected;

    $scope.do = (status) => {
        $scope.pending = status;
        $scope.error = null;
        $http.put(`/post/status/${$scope.post._id}`, { status })
            .success(() => {
                $scope.post.status = status;
                $scope.pending = null;
            })
            .error((err) => {
                $scope.pending = null;
                $scope.error = err;
            });
    };

    $scope.view = (post) => {
        $window.open('/#/view' + post._id, '_blank');
    };
}
