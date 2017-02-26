angular.module('loi').controller('registrationCtrl', registrationCtrl);
registrationCtrl.$inject = ['$scope', '$http'];

function registrationCtrl($scope, $http) {
    $scope.registration = {};
    $scope.do = () => {
        $scope.pending = true;
        $http.post('/user', $scope.registration)
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
