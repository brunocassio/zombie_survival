'use strict';

zombieApp.controller("ReportsController", ['$scope', '$http', '$state', 'ReportService', 'AlertService',
    function ($scope, $http, $state, ReportService, AlertService) {

        $scope.report = {};

        $scope.back = function () {
          $state.go('listAllSurvivors');
        };

        $scope.infectedPoints = function () {
            ReportService.getInfectedPoints().then(function (result) {
                if (result && result.plain()) {
                    $scope.report = result.plain();
                    $state.go('listReports.infectedPoints');
                } else {
                    AlertService.error("There is no Report to show!")
                }
            })
        };

        $scope.peopleInventoryReport = function () {
            ReportService.getPeopleInventory().then(function (result) {
                if (result && result.plain()) {
                    $scope.report = result.plain();
                    $state.go('listReports.peopleInventoryReport');
                } else {
                    AlertService.error("There is no Report to show!")
                }
            })
        };

        $scope.nonInfectedReport = function () {
            ReportService.getAverageNonInfectPeople().then(function (result) {
                if (result && result.plain()) {
                    $scope.report = result.plain();
                    $state.go('listReports.nonInfectedReport');
                } else {
                    AlertService.error("There is no Report to show!")
                }
            })
        };

        $scope.infectedReport = function () {
            ReportService.getAverageInfectPeople().then(function (result) {
                if (result && result.plain()) {
                    $scope.report = result.plain();
                    $state.go('listReports.infectedReport');
                } else {
                    AlertService.error("There is no Report to show!")
                }
            })
        };
    }]);


