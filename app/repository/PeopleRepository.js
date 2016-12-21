'use strict';

zombieApp.factory('PeopleRepository', ['Restangular', 'AbstractRepository',
    function (restangular, AbstractRepository) {
        
        function PeopleRepository() {
            AbstractRepository.call(this, restangular, '/api');

            this.fetchesAllSurvivors = function () {
                return restangular.one(this.route + '/people').get();
            };

            this.fecthSingleSurvivor = function (idSurvivor) {
                return restangular.one(this.route + '/people/' + idSurvivor).get();
            };

            this.registerNewSurvivor = function (survivor) {
                return restangular.all(this.route + '/people').post(survivor);
            }
        }

        AbstractRepository.extend(PeopleRepository);

        return new PeopleRepository();
    }]);

