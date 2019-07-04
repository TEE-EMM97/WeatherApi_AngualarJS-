(function () {

    'use strict';

    var app = angular.module('Home');

    app.controller('HomeCtrl', control);

    control.$inject = [];

    function control() {
        var vm = angular.extend(this, {
            api_key: '3ae40bca12e2f190686e1d529ef34f00'
        });
    }

})();