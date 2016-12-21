'use strict';

zombieApp.controller("ListAllSurvivorsController", ['$scope', '$http', '$state', 'PeopleService', 'PropertiesService',
    function ($scope, $http, $state, PeopleService, PropertiesService) {

        $scope.listAllSurvivors = [];

        $scope.gridOptions = {
            columnDefs: [
                {displayName: 'Name', field: 'name'},
                {displayName: 'Age', field:'age', enableFiltering: false},
                {displayName: 'Gender', field:'gender', enableFiltering: false},
                {displayName: 'Last Location', field:'lonlat',  width: 350, enableFiltering: false},
                {displayName: 'Infected?', field:'infected?', enableFiltering: false},
                {displayName: 'Details', field:'detailstemplate', cellTemplate: 'app/template/grid/cell-template.html', enableFiltering: false}
            ],
            data:'listAllSurvivors',
            enableFiltering: true

        };

        $scope.addSurvivor = function () {
            $state.go('addSurvivor');
        };

        $scope.showSurvivor = function (survivor) {
            if(survivor.location !== null){
                var id = survivor.location.substr(53,survivor.location.lenght);

                PeopleService.fecthSingleSurvivor(id).then(function (result) {
                    if(result && result.plain()){
                        $scope.survivor = result.plain();
                        $state.go('showSurvivor', {survivor : $scope.survivor})
                    }else{
                        console.log('there is no survivor');
                    }
                });
            }
        };

        $scope.getInventory = function (id) {
            PropertiesService.getInventory(id).then(function (result) {
                if(result && result.plain()){
                    $scope.inventory = result.plain();
                    $state.go('showInventory', {inventory : $scope.inventory});
                }else{
                    console.log('there is no inventory');
                }
            })
        };

        $scope.fetchInventoryBySurvivor = function (survivor) {
            if(survivor.location !== null){
                $http.get(survivor.location)
                    .then(function (result) {
                        if(result && result.data){
                            $scope.survivor = result.data;
                            $scope.getInventory($scope.survivor.id);
                        }else{
                            console.log('there is no survivor');
                        }
                    });
            }
        };

        $scope.loadData = function () {
            PeopleService.fetchesAllSurvivors().then(function (result) {
                if (result && result.plain()) {
                    $scope.listAllSurvivors = result.plain();
                } else {
                    console.log('the list is empty');
                }
            });
        };

        $scope.loadData();
    }]);


