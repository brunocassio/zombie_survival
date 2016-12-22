'use strict';

zombieApp.controller("FlagSurvivorController",
    ['$scope', '$http', '$state', '$stateParams', '$log', '$timeout', 'PeopleService', 'PropertiesService', 'AlertService',
    function ($scope, $http, $state, $stateParams, $log, $timeout, PeopleService, PropertiesService, AlertService) {

        $scope.survivor = $stateParams.survivor;

        $scope.gridOptions = {
            columnDefs: [
                {displayName: 'Name', field:'name'},
                {displayName: 'Location', field: 'location', width: 800, enableFiltering: false},
                {displayName: 'Infected', field: 'infected?', enableFiltering: false}
            ],
            data:'listAllSurvivors',
            enableFiltering: true
        };

        $scope.register = function () {
            PeopleService.registerInfectedPerson($scope.suspectId, $scope.yourId);

        };

        $scope.back = function () {
          $state.go('listAllSurvivors');
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


