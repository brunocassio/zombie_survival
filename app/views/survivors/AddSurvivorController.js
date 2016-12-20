'use strict';

zombieApp.controller("AddSurvivorController", ['$scope', '$http', '$state', '$log', '$timeout', 'PeopleService', 'PropertiesService',
    function ($scope, $http, $state, $log, $timeout, PeopleService, PropertiesService) {

        $scope.map = { center: { latitude: -16.6862492, longitude: -49.2867181}, zoom: 14 };

        $scope.options = {
            scrollwheel: false
        };
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
            id: 0,
            coords: {
                latitude: -16.6862492,
                longitude: -49.2867181
            },
            options: {
                draggable: true
            },
            events: {
                dragend: function(marker, eventName, args) {
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "",
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };

        $scope.$watchCollection("marker.coords", function(newVal, oldVal) {
            $scope.map.center.latitude = $scope.marker.coords.latitude;
            $scope.map.center.longitude = $scope.marker.coords.longitude;
            if (_.isEqual(newVal, oldVal))
                return;
            $scope.coordsUpdates++;
        });

        $timeout(function() {
            $scope.marker.coords = {
                latitude: -16.6862492,
                longitude: -49.2867181
            };
            $scope.dynamicMoveCtr++;
            $timeout(function() {
                $scope.marker.coords = {
                    latitude: -16.6862492,
                    longitude: -49.2867181
                };
                $scope.dynamicMoveCtr++;
            }, 2000);
        }, 1000);

        $scope.gender = [
            {valor: 'M', descricao: 'M'},
            {valor: 'F', descricao: 'F'}
        ];

        $scope.items = [
            {valor: 'water', descricao: 'Water'},
            {valor: 'food', descricao: 'Food'},
            {valor: 'medication', descricao: 'Medication'},
            {valor: 'ammunition', descricao: 'Ammunition'},

        ];

        $scope.add = function () {

        };

        $scope.back = function () {
            $state.go('listAllSurvivors');
        }
    }]);