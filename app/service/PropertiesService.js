'user strict';

zombieApp.service('PropertiesService', ['PropertiesRepository',
    function (PropertiesRepository) {

        return {
            getInventory: function (id) {
                return PropertiesRepository.getInventory(id);
            }
        }
    }]);