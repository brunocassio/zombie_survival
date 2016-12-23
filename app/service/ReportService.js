'user strict';

zombieApp.service('ReportService', ['ReportRepository',
    function (ReportRepository) {

        return {
            getAverageInfectPeople: function () {
                return ReportRepository.getAverageInfectPeople();
            }

        }
    }]);