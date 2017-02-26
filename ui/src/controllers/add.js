angular.module('loi').controller('addCtrl', addCtrl);
addCtrl.$inject = ['$scope', '$http'];

function addCtrl($scope, $http) {
    $scope.add = {};
    $scope.do = () => {
        $scope.pending = true;
        $scope.error = null;
        $http.post('/post', $scope.add)
            .success(() => {
                $scope.pending = false;
                $scope.go('posts');
            })
            .error((err) => {
                $scope.pending = false;
                $scope.error = err;
            });
    };
}