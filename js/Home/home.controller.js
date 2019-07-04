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
            $http.get("http://ip-api.com/json").success(function (data) {
                vm.lat = data.lat;
                vm.lon = data.long;
            });
        }

        vm.getWeather = function(){
            var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + vm.lat
                + "&lon=" + vm.lon + "&appid=" + vm.api_key;
                $http.get(openWeatherURL, function success(data){
                    vm.description = data.weather[0].description;
                    vm.speed = (2.237 * data.wind.speed).toFixed(1) + " mph";
                    vm.name = data.name;
                    vm.temp = data.main.temp;
                    vm.cTemp = (vm.temp - 32) * (5 / 9).toFixed(1) + " (ºC)";
                })
        };

        return vm;
    }




})();