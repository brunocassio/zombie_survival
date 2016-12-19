'use strict';

zombieApp.controller("ShowSurvivorController", ['$scope', '$http', '$state', '$stateParams','PeopleService', 'PropertiesService',
    function ($scope, $http, $state, $stateParams, PeopleService, PropertiesService) {

        $scope.survivor = $stateParams.survivor;

        $scope.gridOptions = {
            columnDefs: [
                {name: 'Quantity', field: 'quantity', width: 400},
                {name: 'Name', field:'item.name', width: 400},
                {name: 'Points', field:'item.points', width: 400}
            ],
            data:'inventory',
            enableColumnsMenus: false
        };

        $scope.getInventory = function (id) {
            PropertiesService.getInventory(id).then(function (result) {
                if(result && result.plain()){
                    $scope.inventory = result.plain();
                }else{
                    console.log('there is no inventory');
                }
            })
        };
    }]);


