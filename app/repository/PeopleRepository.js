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
            };

            this.updateLastLocation = function (idSurvivor, lastLocation) {
                return restangular.one(this.route + '/people/' + idSurvivor).patch({lonlat: lastLocation});
            };

            this.registerInfectedPerson = function (suspectId, yourId) {
                return restangular
                    .all(this.route + '/people/' + yourId + '/report_infection')
                    .customPOST(undefined , undefined, {infected: suspectId}, {});
            }
        }

        AbstractRepository.extend(PeopleRepository);

        return new PeopleRepository();
    }]);

