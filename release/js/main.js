var Helpers;
(function (Helpers) {
    Helpers.baseApiUrl = "https://sandbox.tradier.com/";
    Helpers.author = 'Alex M Cullimore';
    function getTradierAuthToken() {
        Helpers.authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
    }
    ;
})(Helpers || (Helpers = {}));
/// <reference path="../../TypeDefinitionFiles/angular.d.ts" />
(function () {
    'use strict';
    angular.module('tradierApp', ['ngRoute']);
})();
/// <reference path="../../TypeDefinitionFiles/angular.d.ts" />
/// <reference path="../helper.ts" />
(function (angular) {
    'use strict';
    angular.module('tradierApp').config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$window', '$location',
                function ($q, $window, $location) {
                    return {
                        'request': function (req) {
                            req.headers = req.headers || {};
                            Helpers.getTradierAuthToken();
                            if (Helpers.authToken)
                                req.headers.Authorization = 'Bearer ' + Helpers.authToken;
                            req.headers.Accept = 'application/json';
                            return req;
                        }
                    };
                }
            ]);
        }]);
})(angular);
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

/// <reference path="../../../TypeDefinitionFiles/angular.d.ts" />
/// <reference path="../../helper.ts" />
(function (angular) {
    angular.module('tradierApp').factory('httpCallsFactory', ['$scope', '$http',
        function ($scope, $http) {
            var get = function (url, callback) {
                $http.get(url).then(function (response) {
                    callback(response);
                });
            };
            return {
                "get": get
            };
        }
    ]);
})(angular);
///<reference path="../../../TypeDefinitionFiles/angular.d.ts" />
///<reference path="../utilities/ajaxCalls.ts"/>
(function (angular) {
    'use strict';
    angular.module('tradierApp').controller('quotesController', ['$scope', 'httpCallsFactory', '$rootScope',
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
