angular.module('loi').controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', '$http'];

function loginCtrl($scope, $http) {
    $scope.login = {};
    $scope.do = () => {
        $scope.pending = true;
        $http.post('/user/login', $scope.login)
            .success(() => {
                $scope.pending = false;
                $scope.go('my');
            })
            .catch((err) => {
                $scope.pending = false;
                $scope.error = err;
            });
    }
}