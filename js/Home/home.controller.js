(function () {

    'use strict';

    var app = angular.module('Home');

    app.controller('HomeCtrl', control);

    control.$inject = ['$http'];

    function control($http) {

        var vm = angular.extend(this, {
            api_key: '3ae40bca12e2f190686e1d529ef34f00',
            gotWeather: false,
            units: "metric"
        });

        function getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        vm.lat = position.coords.latitude;
                        vm.lon = position.coords.longitude;
                    },
                    err => {
                        console.error(err);
                    },
                    {
                        enableHighAccuracy: true
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser!");
            }

        }

        getLocation();

        vm.getWeather = function () {

            var url = `https://api.openweathermap.org/data/2.5/weather?lat=${vm.lat}&lon=${vm.lon}&units=${vm.units}&appid=${vm.api_key}`

            $http.get(url).then(

                function success(response) {
                    vm.description = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1);
                    vm.windSpeed = (2.236936 * response.data.wind.speed).toFixed(1);
                    vm.name = response.data.name;
                    vm.tempCelsius = response.data.main.temp.toFixed(2);
                    vm.tempFahrenheit = ((vm.tempCelsius * (9 / 5)) + 32).toFixed(2);
                    vm.gotWeather = true;
                },

                function error(err) {
                    console.log(err)
                }

            );

        };

        return vm;

    }

})();