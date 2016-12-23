'use strict';

zombieApp.factory('ReportRepository', ['Restangular', 'AbstractRepository',
    function (restangular, AbstractRepository) {
        
        function ReportRepository() {
            AbstractRepository.call(this, restangular, '/api');

            this.getAverageInfectPeople = function () {
                return restangular.one(this.route + '/report/infected').get();
            };

            this.getAverageNonInfectPeople = function () {
              return restangular.one(this.route + '/report/non_infected').get();
            };

            this.getPeopleInventory = function () {
                return restangular.one(this.route + '/report/people_inventory').get();
            };

            this.getInfectedPoints = function () {
                return restangular.one(this.route + '/report/infected_points').get();
            };
        }

        AbstractRepository.extend(ReportRepository);

        return new ReportRepository();
    }]);

