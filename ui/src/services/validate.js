const validatejs = require('validate.js');
const fields = require('../../../core/validate/fields');

angular.module('loi').service('validate', validate);

function validate() {
    return (name, value) => {
        const error = validatejs({[name]: value}, {[name]: fields[name]});
        return error && error[name][0];
    }
}
