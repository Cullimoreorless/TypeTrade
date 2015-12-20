(function () {
    'use strict';
    angular.module('tradierApp').config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('quotes', {
                templateUrl: '/scripts/modules/api/quotes.html',
                controller: 'quotesController'
            });
        }
    ]);
})();
//# sourceMappingURL=app.route.js.map