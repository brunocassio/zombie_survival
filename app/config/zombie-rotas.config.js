'use strict';

zombieApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list-all-survivors");

    $stateProvider
        .state('listAllSurvivors', {
            url: '/list-all-survivors',
            templateUrl: 'app/views/survivors/list-all-survivors.html',
            controller: 'ListAllSurvivorsController'
        })
        .state('showInventory', {
            url: '/show-inventory',
            templateUrl: 'app/views/inventory/show-inventory.html',
            controller: 'InventoryController',
            params: {inventory : null}
        })
        .state('showSurvivor', {
            url: '/show-survivor',
            templateUrl: 'app/views/survivors/show-survivor.html',
            controller: 'ShowSurvivorController',
            params: {survivor : null}
        })
}]);