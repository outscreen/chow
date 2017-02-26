angular.module('loi').directive('spinner', spinner);
function spinner() {
    return {
        restrict: 'E',
        replace: true,
        template: (elem, attr) => (`
            <div class="spinner ${attr.color}">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
        `)
    };
}