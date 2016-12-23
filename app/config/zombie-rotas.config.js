'use strict';

zombieApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list-all-survivors");

    $stateProvider
        .state('listAllSurvivors', {
            url: '/list-all-survivors',
            templateUrl: 'app/views/survivors/list-all-survivors.html',
            controller: 'ListAllSurvivorsController'
        })
        .state('showSurvivor', {
            url: '/show-survivor',
            templateUrl: 'app/views/survivors/show-survivor.html',
            controller: 'ShowSurvivorController',
            params: {survivor : null, infected: null}
        })
        .state('addSurvivor', {
            url: '/add-survivor',
            templateUrl: 'app/views/survivors/add-survivor.html',
            controller: 'AddSurvivorController'
        })
        .state('flagSurvivor', {
            url: '/flag-survivor',
            templateUrl: 'app/views/survivors/flag-survivor.html',
            controller: 'FlagSurvivorController'
        })
        .state('listReports', {
            url: '/list-reports',
            templateUrl: 'app/views/reports/list-reports.html',
            controller: 'ReportsController'
        })
        .state('infectedReport', {
            url: '/infected-report',
            templateUrl: 'app/views/reports/infected-report.html',
            controller: 'ReportsController'
        })
}]);