'use strict';

zombieApp.controller("ListAllSurvivorsController", ['$scope', '$http', 'PeopleService',
    function ($scope, $http, PeopleService) {

        $scope.listAllSurvivors = [];

        $scope.gridOptions = {
            columnDefs: [
                {name: 'Name', field: 'name', width: 225},
                {name: 'Age', field:'age', width: 100},
                {name: 'Gender', field:'gender', width: 150},
                {name: 'Last Location', field:'lonlat', width: 350},
                {name: 'Infected?', field:'infected?', width: 150},
                {name: 'Inventory', field:'inventorytemplate', cellTemplate: 'app/template/grid/cell-template.html'}
            ],
            data:'listAllSurvivors',
            enableColumnsMenus: false
        };

        $scope.fetchInventoryBySurvivor = function (survivor) {
            if(survivor.location !== null){
                $http.get(survivor.location)
                    .then(function (result) {
                        if(result && result.data){
                            $scope.survivor = result.data;
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


