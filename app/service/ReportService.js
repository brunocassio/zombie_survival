'user strict';

zombieApp.service('ReportService', ['ReportRepository',
    function (ReportRepository) {

        return {
            getAverageInfectPeople: function () {
                return ReportRepository.getAverageInfectPeople();
            },

            getAverageNonInfectPeople: function () {
                return ReportRepository.getAverageNonInfectPeople();
            },

            getPeopleInventory: function () {
                return ReportRepository.getPeopleInventory();
            },

            getInfectedPoints: function () {
                return ReportRepository.getInfectedPoints();
            }

        }
    }]);