(function () {

    'use strict';

    var app = angular.module('Home');

    app.controller('HomeCtrl', control);

    control.$inject = ['$http'];

    function control($http) {

        var vm = angular.extend(this, {
            api_key: '3ae40bca12e2f190686e1d529ef34f00'
        });

        function getLocation() {

            $http.get("http://ip-api.com/json").then(

                function success(response) {
                    vm.lat = response.data.lat;
                    vm.lon = response.data.lon;
                },

                function failure(err) {
                    console.log(err);
                }

            );
        }

        getLocation();

        vm.getWeather = function () {

            var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + vm.lat + "&lon=" + vm.lon + "&appid=" + vm.api_key;

            $http.get(url).then(

                function success(response) {
                    let data = response.data;
                    vm.description = data.weather[0].description;
                    vm.speed = (2.237 * data.wind.speed).toFixed(1) + " mph";
                    vm.name = data.name;
                    vm.temp = data.main.temp;
                    vm.cTemp = (vm.temp - 32) * (5 / 9).toFixed(1) + " (ºC)";
                },

                function error(err) {
                    console.log(err)
                }

            );

        };

        return vm;

    }

})();