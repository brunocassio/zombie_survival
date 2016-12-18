'use strict';

zombieApp.controller("InventoryController", ['$scope', '$http', '$state','$stateParams','PeopleService', 'PropertiesService',
    function ($scope, $http, $state, $stateParams, PeopleService, PropertiesService) {

        $scope.inventory = $stateParams.inventory;

        $scope.gridOptions = {
            columnDefs: [
                {name: 'Quantity', field: 'quantity', width: 225},
                {name: 'Name', field:'item.name', width: 100},
                {name: 'Points', field:'item.points', width: 150}
            ],
            data:'inventory',
            enableColumnsMenus: false
        };

    }]);


