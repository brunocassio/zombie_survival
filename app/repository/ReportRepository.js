'use strict';

zombieApp.factory('ReportRepository', ['Restangular', 'AbstractRepository',
    function (restangular, AbstractRepository) {
        
        function ReportRepository() {
            AbstractRepository.call(this, restangular, '/api');

            this.getAverageInfectPeople = function () {
                return restangular.one(this.route + '/report/infected').get();
            };
        }

        AbstractRepository.extend(ReportRepository);

        return new ReportRepository();
    }]);

