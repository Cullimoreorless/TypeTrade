///<reference path="../../../TypeDefinitionFiles/angular.d.ts" />
///<reference path="../utilities/ajaxCalls.ts"/>
(function (angular) {
    'use strict';
    angular.app('tradierApp').controller('quotesController', ['$scope', 'httpCallsFactory', '$rootScope',
        function ($scope, httpCallsFactory, $rootScope) {
            $scope.getQuote = function () {
                if (!$scope.symbols)
                    $scope.symbols = 'MSFT';
                httpCallsFactory.get('v1/markets/quotes?symbols=' + $scope.symbols, function (response) {
                    $scope.quotes = response.data;
                });
            };
        }
    ]);
})(angular);
//# sourceMappingURL=quotesController.js.map