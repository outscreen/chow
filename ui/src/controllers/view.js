angular.module('loi').controller('viewCtrl', viewCtrl);
viewCtrl.$inject = ['$scope', '$http', '$stateParams'];

function viewCtrl($scope, $http, $stateParams) {
    $http.get(`/post/${$stateParams.id}`)
        .success((posts) => {
            $scope.post = posts[0];
        })
        .error((err) => {
            $scope.error = err;
        });
}