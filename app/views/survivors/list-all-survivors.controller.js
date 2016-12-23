'use strict';

zombieApp.controller("ListAllSurvivorsController", ['$scope', '$http', '$state', 'PeopleService',
    function ($scope, $http, $state, PeopleService) {

        $scope.listAllSurvivors = [];

        $scope.gridOptions = {
            columnDefs: [
                {displayName: 'Name', field: 'name', width:200},
                {displayName: 'Age', field:'age', width:75, enableFiltering: false},
                {displayName: 'Gender', field:'gender', width:75, enableFiltering: false},
                {displayName: 'Last Location', field:'lonlat',  width: 450, enableFiltering: false},
                {displayName: 'Infected?', field:'infected?', width:100, enableFiltering: false},
                {displayName: 'Actions', field:'detailstemplate', cellTemplate: 'app/template/grid/cell-template.html', enableFiltering: false}
            ],
            data:'listAllSurvivors',
            enableFiltering: true

        };

        $scope.flagSurvivor = function () {
            $state.go('flagSurvivor');
        };

        $scope.addSurvivor = function () {
            $state.go('addSurvivor');
        };

        $scope.showSurvivor = function (survivor) {
            $scope.infected = null;
            if(survivor.location !== null){
                var id = survivor.location.substr(53,survivor.location.lenght);
                $scope.infected = survivor['infected?'];

                PeopleService.fecthSingleSurvivor(id).then(function (result) {
                    if(result && result.plain()){
                        $scope.survivor = result.plain();
                        $state.go('showSurvivor', {survivor : $scope.survivor, infected: $scope.infected});
                    }else{
                        console.log('there is no survivor');
                    }
                });
            }
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

        $scope.showReports = function () {
            $state.go('listReports');
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


