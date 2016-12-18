'use strict';

zombieApp.controller("ShowSurvivorController", ['$scope', '$http', '$state', '$stateParams','PeopleService', 'PropertiesService',
    function ($scope, $http, $state, $stateParams, PeopleService, PropertiesService) {

        $scope.survivor = $stateParams.survivor;

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
    }]);


