var Helpers;
(function (Helpers) {
    Helpers.authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
    Helpers.baseApiUrl = "https://sandbox.tradier.com/v1/";
    function getTradierAuthToken() {
        //TODO: authorization calls
        Helpers.authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
    }
    ;
})(Helpers || (Helpers = {}));
var tradierApp;
(function (tradierApp) {
    (function () {
        'use strict';
        angular.module('tradeApp', ['ngRoute']);
    })();
})(tradierApp || (tradierApp = {}));
///<reference path="../helper.ts" />
(function (angular) {
    'use strict';
    angular.module('tradeApp').config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$window', '$location',
                function ($q, $window, $location) {
                    return {
                        'request': function (req) {
                            req.headers = req.headers || {};
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
(function (angular) {
    'use strict';
    angular.module('tradeApp').config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/quotes', {
                templateUrl: '/scripts/modules/market/quotes.html',
                controller: 'quotesController'
            });
        }
    ]);
})(angular);
/// <reference path="../../helper.ts" />
var tradierApp;
(function (tradierApp) {
    'use strict';
    var HttpCallsService = (function () {
        function HttpCallsService($http) {
            this.$http = $http;
            this.http = $http;
        }
        ;
        HttpCallsService.prototype.get = function (url, callback) {
            this.http.get(Helpers.baseApiUrl + url).then(function (response) {
                callback(response);
            }, function (reason) { alert(reason); });
        };
        HttpCallsService.$inject = ['$http'];
        return HttpCallsService;
    })();
    tradierApp.HttpCallsService = HttpCallsService;
    (function (angular) {
        angular.module('tradeApp')
            .service('httpCallsService', HttpCallsService);
    })(angular);
})(tradierApp || (tradierApp = {}));
var tradierApp;
(function (tradierApp) {
    'use strict';
    var SearchCompanyController = (function () {
        function SearchCompanyController(httpCallsService, $scope) {
            this.httpCallsService = httpCallsService;
            this.$scope = $scope;
            $scope.symbols = "";
            $scope.searchCompanies = function () {
                httpCallsService.get(UrlBuilder.searchCompany($scope.query, $scope.includeIndexes), function (response) {
                    $scope.securities = [];
                    var sec = response.data.securities.security;
                    if (Array.isArray(sec))
                        $scope.securities = sec;
                    else
                        $scope.securities.push(sec);
                });
            };
            $scope.addSymbol = function (newSymbol) {
                if ($scope.symbols.length != 0)
                    $scope.symbols += ',';
                $scope.symbols += newSymbol;
            };
        }
        SearchCompanyController.$inject = ['httpCallsService', '$scope'];
        return SearchCompanyController;
    })();
    tradierApp.SearchCompanyController = SearchCompanyController;
    function searchCompany() {
        return {
            controller: "searchCompanyController",
            restrict: "E",
            scope: {
                symbols: "="
            },
            templateUrl: "/scripts/modules/commonUtil/searchCompany.html",
            replace: true
        };
    }
    tradierApp.searchCompany = searchCompany;
    (function (angular) {
        angular.module('tradeApp')
            .controller('searchCompanyController', SearchCompanyController)
            .directive('searchCompany', searchCompany);
    })(angular);
})(tradierApp || (tradierApp = {}));
var UrlBuilder;
(function (UrlBuilder) {
    //specifically for market operations
    function getQuotes(symbols) {
        return 'markets/quotes?symbols=' + symbols;
    }
    UrlBuilder.getQuotes = getQuotes;
    ;
    function searchCompany(query, includeIndex) {
        if (!includeIndex)
            includeIndex = false;
        return 'markets/search?q=' + query + '&indexes=' + includeIndex.toString();
    }
    UrlBuilder.searchCompany = searchCompany;
    ;
})(UrlBuilder || (UrlBuilder = {}));
///<reference path="../commonUtil/urlBuilders/marketUrlBuilders.ts" />
var tradierApp;
(function (tradierApp) {
    var QuotesController = (function () {
        function QuotesController($scope, httpCallsService, $rootScope) {
            this.$scope = $scope;
            this.httpCallsService = httpCallsService;
            this.$rootScope = $rootScope;
            $scope.getQuote = function () {
                if (!$scope.symbols)
                    $scope.symbols = 'MSFT';
                httpCallsService.get(UrlBuilder.getQuotes($scope.symbols), function (response) {
                    $scope.quotes = [];
                    var q = response.data.quotes.quote;
                    if (Array.isArray(q))
                        $scope.quotes = q;
                    else
                        $scope.quotes.push(q);
                });
            };
        }
        QuotesController.$inject = ['$scope', 'httpCallsService', '$rootScope'];
        return QuotesController;
    })();
    tradierApp.QuotesController = QuotesController;
    (function (angular) {
        angular.module('tradeApp')
            .controller('quotesController', QuotesController);
    })(angular);
})(tradierApp || (tradierApp = {}));
//# sourceMappingURL=mainJS.js.map