angular.module('loi').controller('addCtrl', addCtrl);
addCtrl.$inject = ['$scope', '$http', '$stateParams'];

function addCtrl($scope, $http, $stateParams) {
    const post = JSON.parse($stateParams.post || '{}');
    $scope.add = {
        _id: post._id,
        title: post.title,
        description: post.description,
        url: post.url,
    };
    $scope.do = () => {
        const id = $scope.add._id ? `/${$scope.add._id}` : '';
        $scope.pending = true;
        $scope.error = null;
        $http[id ? 'put' : 'post'](`/post${id}`, $scope.add)
            .success(() => {
                $scope.pending = false;
                $scope.go('my');
            })
            .error((err) => {
                $scope.pending = false;
                $scope.error = err;
            });
    };
}