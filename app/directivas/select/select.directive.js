'use strict';

zombieApp.directive('selectInput', [function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directivas/select/select.html',
        scope: {
            ngModel: '=',
            ngRequired: '=',
            provider: '=',
            propriedadeDescricao: '@',
            propriedadeValor: '@',
            colspan: '@',
            label: '@'
        },
        link: link
    };


    function link(scope) {
        scope.idInputSelect = 'selectInput' + scope.$id;
        scope.classColspan = 'col-md-'+ (scope.colspan);

        scope.propriedadeDescricao = scope.propriedadeDescricao || 'descricao';
        scope.propriedadeValor = scope.propriedadeValor || 'valor';
    }
}]);

