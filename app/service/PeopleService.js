'user strict';

zombieApp.service('PeopleService', ['PeopleRepository',
    function (PeopleRepository) {

        return {
            fetchesAllSurvivors: function () {
                return PeopleRepository.fetchesAllSurvivors();
            },
            fecthSingleSurvivor: function (idSurvivor) {
                return PeopleRepository.fecthSingleSurvivor(idSurvivor);
            }
        }
    }]);