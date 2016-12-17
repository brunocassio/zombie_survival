'use strict';

zombieApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list-all-survivors");

    $stateProvider
        .state('listAllSurvivors', {
            url: '/list-all-survivors',
            templateUrl: 'app/views/survivors/list-all-survivors.html',
            controller: 'ListAllSurvivorsController'
        })
}]);