'use strict';

zombieApp.factory('PropertiesRepository', ['Restangular', 'AbstractRepository',
    function (restangular, AbstractRepository) {

        function PropertiesRepository() {
            AbstractRepository.call(this, restangular, '/api');

            this.getInventory = function (id) {
                return restangular.one(this.route + '/people/' + id + '/properties').get();
            };
        }

        AbstractRepository.extend(PropertiesRepository);

        return new PropertiesRepository();
    }]);

