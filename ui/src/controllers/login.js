angular.module('loi').controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$scope'];

function loginCtrl($scope) {
    $scope.des = {};

    $scope.isWeak = (key) => $scope.DesForm.key.$setValidity('weak', !isWeak(key));

    $scope.des.do = (msg, isEncrypt) => {
        let encoded = '';
        let binaryKey = hexToBinary($scope.des.key);
        let binaryMessage;
        switch ($scope.des.msgFormat) {
            case 'hex':
                binaryMessage = hexToBinary(expandString(msg, '0'));
                break;
            case 'utf':
                binaryMessage = stringTo(expandString(msg, '.'), 2);
                break;
            default:
                console.error('Unknown message type');
        }
        while (binaryMessage) {
            const part = binaryMessage.slice(0, 64);
            binaryMessage = binaryMessage.slice(64);
            const des = new DES(part, binaryKey);
            encoded += des[isEncrypt ? 'encrypt' : 'decrypt']();
        }
        $scope.des.result = {
            binary: encoded,
            hex: binaryToHex(encoded),
            text: toString(encoded, 2),
        };
    }
}