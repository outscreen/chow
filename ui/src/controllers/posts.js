angular.module('loi').controller('postsCtrl', postsCtrl);
postsCtrl.$inject = ['$scope', '$http', 'config', 'user'];

function postsCtrl($scope, $http, config, user) {
    $scope.posts = {
        statusList: config.status,
        mode: 'all',
    };
    $scope.show = (mode) => {
        $scope.pending = true;
        const status = mode ? `$status=${mode}` : '';
        $http.get(`/post?user=${user.uuid}${status}`)
            .success((posts) => {
                $scope.pending = false;
                $scope.posts.list = posts;
            })
            .error((err) => {
                $scope.pending = false;
                $scope.error = err;
            });
    };
    $scope.show();
}