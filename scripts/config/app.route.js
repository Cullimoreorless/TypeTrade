///<reference path="../../TypeDefinitionFiles/angular.d.ts"/>
(function (angular) {
    'use strict';
    angular.module('tradierApp').config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('quotes', {
                templateUrl: '/scripts/modules/api/quotes.html',
                controller: 'quotesController'
            });
        }
    ]);
})(angular);
//# sourceMappingURL=app.route.js.map