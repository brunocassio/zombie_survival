'use strict';

zombieApp.controller("AddSurvivorController", ['$scope', '$http', '$state', '$log', '$timeout', 'PeopleService', 'AlertService',
    function ($scope, $http, $state, $log, $timeout, PeopleService, AlertService) {


        $scope.index = null;
        $scope.item = {};
        $scope.items = [];

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

        $scope.selectItems = [
            {valor: 'Water', descricao: 'Water'},
            {valor: 'Food', descricao: 'Food'},
            {valor: 'Medication', descricao: 'Medication'},
            {valor: 'Ammunition', descricao: 'Ammunition'},

        ];

        $scope.gridOptions = {
            columnDefs: [
                {name: 'Name', field: 'name', width: 400},
                {name: 'Quantity', field:'quantity', width: 400},
                {name: '', field:'acoes', cellTemplate: 'app/template/grid/delete-template.html'}
            ],
            data:'items',
            enableColumnsMenus: false
        };

        $scope.survivor = {
            lonlat: "point(".concat($scope.marker.coords.latitude)
                            .concat(" ")
                            .concat($scope.marker.coords.longitude)
                            .concat(")"),
            items: null
        };

        $scope.clear = function () {
            $scope.index = null;
            $scope.item = {};
            $scope.items = [];
            $scope.survivor = {};
            $scope.value = null;
            $scope.quantity = null;
        };

        $scope.save = function () {
            $scope.survivor.items = null;

            $scope.items.forEach(function(item) {
                $scope.survivor.items = item.name + ':' + item.quantity + (';' + ($scope.survivor.items || ''));
            });

            PeopleService.registerNewSurvivor($scope.survivor);
            AlertService.success('Survivor registered with success!');
            $scope.clear();
        };

        $scope.removeItem = function (linha) {
            var index = $scope.items.indexOf(linha);
            $scope.items.splice(index, 1);
        };

        $scope.add = function (name, quantity) {
            $scope.item = {name: name, quantity: quantity};
            $scope.items.push($scope.item);
        };

        $scope.back = function () {
            $state.go('listAllSurvivors');
        }
    }]);