'use strict';

zombieApp.factory('PeopleRepository', ['RestAngular', 'AbstractRepository',
    function (restangular, AbstractRepository) {
        
        function PeopleRepository() {
            AbstractRepository.call(this, restangular, 'http://zssn-backend-example.herokuapp.com');

            this.fetchesAllSurvivors = function () {
                return restangular.all(this.route + '/api/people.json').get();
            }
        }

        AbstractRepository.extend(PeopleRepository);

        return new PeopleRepository();
    }]);

