angular.module('loi').controller('usersCtrl', usersCtrl);
usersCtrl.$inject = ['$scope', '$http', 'config', 'user'];

function usersCtrl($scope, $http, config, user) {
    $scope.users = {
        roles: config.roles.list,
    };

    $http.get('/user/all')
        .success((users) => {
            $scope.users.list = users;
        })
        .error((err) => {
            $scope.userListError = err;
        });

    $scope.do = (user) => {
        $scope.pending = user.uuid;
        user.error = null;
        $http.put(`/user/role/${user.uuid}`, {role: user.role})
            .success(() => {
                $scope.pending = null;
            })
            .error((err) => {
                $scope.pending = null;
                user.error = err;
            });
    };
}