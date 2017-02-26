angular.module('loi').directive('file', file);
fileCtrl.$inject = ['$scope', 'cloudinary'];
function file(cloudinary) {
    return {
        restrict: 'E',
        replace: true,
        controller: fileCtrl,
        //controllerAs: 'fileCtrl',
        //bindToController: true,
        templateUrl: require('./file.html'),
        scope: {
            data: '='
        },
    };
}

function fileCtrl($scope, cloudinary) {
    $scope.data = $scope.data || {};
    $scope.$watch('file', function (file) {
        if (!file) return;
        $scope.pending = true;
        $scope.error = null;
        cloudinary.upload(file, {})
            .then((res) => {
                if (res.status !== 200) return Promise.reject(res.data.error.message);
                $scope.pending = false;
                $scope.data.url = res.data.url;
            })
            .catch((err) => {
                $scope.pending = false;
                $scope.error = err;
            });
    });
}
