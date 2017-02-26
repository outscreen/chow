angular.module('loi').controller('postsCtrl', postsCtrl);
postsCtrl.$inject = ['$scope', '$http', '$state', 'config', 'user'];

function postsCtrl($scope, $http, $state, config, user) {
    $scope.posts = {
        statusList: config.status,
        mode: 'all',
        canApprove: $state.is('posts') ? 'approve' : '',
        canEdit: $state.is('my') ? 'edit' : '',
    };
    $scope.show = (mode) => {
        $scope.pending = true;
        const status = mode ? `status=${mode}&` : '';
        const userUuid = $state.is('my') ? `user=${user.uuid}&` : '';
        $http.get(`/post?${userUuid}${status}`)
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