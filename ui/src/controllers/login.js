angular.module('loi').controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope', '$http'];

function loginCtrl($scope, $http) {
    $scope.login = {};
    $scope.do = () => $http.post('/user/login', $scope.login)
        .success((res) => {
            console.log(res);
            $scope.go('profile');
        });
}