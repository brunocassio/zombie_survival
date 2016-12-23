'use strict';

zombieApp.controller("ReportsController", ['$scope', '$http', '$state', 'ReportService', 'AlertService',
    function ($scope, $http, $state, ReportService, AlertService) {

        $scope.report = {};


        $scope.infectedReport = function () {
            ReportService.getAverageInfectPeople().then(function (result) {
                if (result && result.plain()) {
                    $scope.report = result.plain();
                    $state.go('infectedReport');
                } else {
                    AlertService.error("There is no Report to show!")
                }
            })
        };
    }]);


