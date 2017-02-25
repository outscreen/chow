angular.module('loi').controller('registrationCtrl', registrationCtrl);
registrationCtrl.$inject = ['$scope', '$http'];

function registrationCtrl($scope, $http) {
    $scope.registration = {};
    $scope.do = () => $http.post('/user', $scope.registration)
        .success((res) => {
            console.log(res);
            $scope.go('profile');
        });
}
