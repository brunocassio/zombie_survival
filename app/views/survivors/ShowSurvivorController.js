'use strict';

zombieApp.controller("ShowSurvivorController",
    ['$scope', '$http', '$state', '$stateParams', '$log', '$timeout', 'PeopleService', 'PropertiesService', 'AlertService',
    function ($scope, $http, $state, $stateParams, $log, $timeout, PeopleService, PropertiesService, AlertService) {

        $scope.survivor = $stateParams.survivor;
        $scope.lat = null;
        $scope.lon = null;
        $scope.lonlat = null;
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lon}, zoom: 14 };

        $scope.options = {
            scrollwheel: false
        };
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
            id: 0,
            coords: {
                latitude: $scope.lat,
                longitude: $scope.lon
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
            $scope.lonlat = "POINT ("   .concat($scope.map.center.latitude)
                .concat(" ")
                .concat($scope.map.center.longitude)
                .concat(")");
        });

        $timeout(function() {
            $scope.marker.coords = {
                latitude: $scope.lat,
                longitude: $scope.lon
            };
            $scope.dynamicMoveCtr++;
            $timeout(function() {
                $scope.marker.coords = {
                    latitude: $scope.lat,
                    longitude: $scope.lon
                };
                $scope.dynamicMoveCtr++;
            }, 2000);
        }, 1000);

        $scope.gridOptions = {
            columnDefs: [
                {name: 'Quantity', field: 'quantity', width: 400},
                {name: 'Name', field:'item.name', width: 400},
                {name: 'Points', field:'item.points', width: 400}
            ],
            data:'inventory',
            enableColumnsMenus: false
        };

        $scope.update = function () {
            PeopleService.updateLastLocation($scope.survivor.id, $scope.lonlat);
            AlertService.success("Survivor's location has been updated!")
        };

        $scope.setLonLat = function (survivor) {
            if(survivor.lonlat !== null){
                var lonlat = survivor.lonlat.substring(7, survivor.lonlat.length-1);
                var space = lonlat.search(" ");
                $scope.lat = lonlat.slice(0, space);
                $scope.lon = lonlat.slice(space, survivor.lonlat.length);
                $scope.lonlat = "POINT ("   .concat($scope.lat)
                                            .concat(" ")
                                            .concat($scope.lon)
                                            .concat(")");
            }else{
                AlertService.error("The Survivor location is undefined!")
            }
        };

        $scope.back = function () {
          $state.go('listAllSurvivors');
        };

        $scope.getInventory = function (id) {
            PropertiesService.getInventory(id).then(function (result) {
                if(result && result.plain()){
                    $scope.inventory = result.plain();
                    if($scope.inventory.length <= 0){
                        AlertService.error('The inventory is empty!');
                    }
                }
            })
        };

        $scope.setLonLat($scope.survivor);
    }]);


