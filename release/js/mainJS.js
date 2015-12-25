var Helpers;
(function (Helpers) {
    Helpers.authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
    Helpers.baseApiUrl = "https://sandbox.tradier.com/v1/";
    function getTradierAuthToken() {
        //TODO: authorization calls
        Helpers.authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
    }
    ;
    function setOrPushArray(arrayToSet, result) {
        arrayToSet = [];
        if (Array.isArray(result))
            arrayToSet = result;
        else
            arrayToSet.push(result);
    }
    Helpers.setOrPushArray = setOrPushArray;
    function getArray(resultSet) {
        var rtnArray = [];
        if (Array.isArray(resultSet))
            return resultSet;
        else {
            rtnArray.push(resultSet);
            return rtnArray;
        }
    }
    Helpers.getArray = getArray;
    function getISODateString(date) {
        var year = date.getFullYear().toString(), month = date.getMonth() + 1, day = date.getDate();
        return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    }
    Helpers.getISODateString = getISODateString;
})(Helpers || (Helpers = {}));
var tradierApp;
(function (tradierApp) {
    (function () {
        'use strict';
        angular.module('tradeApp', ['ngRoute', 'ui.bootstrap', 'n3-line-chart']);
    })();
})(tradierApp || (tradierApp = {}));
///<reference path="../../helper.ts" />
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
            $routeProvider.when('/market/quotes', {
                templateUrl: '/scripts/app/modules/market/quotes.html',
                controller: 'quotesController'
            }).when('/market/history', {
                templateUrl: '/scripts/app/modules/market/marketHistory.html',
                controller: 'marketHistoryController'
            });
        }
    ]);
})(angular);
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
                    $scope.securities = Helpers.getArray(response.data.securities.security);
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
            templateUrl: "/scripts/app/directives/searchCompany.html",
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
    function getHistory(symbol, interval, start, end) {
        return 'markets/history?symbol=' + symbol + (interval ? '&interval=' + interval : '') + (start ? '&start=' + start : '') + (end ? '&end=' + end : '');
    }
    UrlBuilder.getHistory = getHistory;
})(UrlBuilder || (UrlBuilder = {}));
///<reference path="../../utilities/urlBuilders/marketUrlBuilders.ts" />
///<reference path="../../utilities/commonInterfaces.ts"/>
///<reference path="../../../helper.ts"/>
var tradierApp;
(function (tradierApp) {
    var MarketHistoryController = (function () {
        function MarketHistoryController($scope, httpCallsService) {
            this.$scope = $scope;
            this.httpCallsService = httpCallsService;
            $scope.endOpen = false;
            $scope.startOpen = false;
            $scope.today = new Date();
            $scope.open = function (type, event) {
                switch (type) {
                    case 'sd':
                        $scope.startOpen = true;
                        $scope.endOpen = false;
                        break;
                    case 'ed':
                        $scope.startOpen = false;
                        $scope.endOpen = true;
                        break;
                }
            };
            $scope.getHistory = function () {
                var start = Helpers.getISODateString($scope.startDate), end = Helpers.getISODateString($scope.endDate);
                httpCallsService.get(UrlBuilder.getHistory($scope.symbol, $scope.interval, start, end), function (response) {
                    if (response.data.history) {
                        $scope.history = Helpers.getArray(response.data.history.day);
                        for (var i = $scope.history.length - 1; i >= 0; i--) {
                            $scope.history[i].trueDate = new Date((new Date($scope.history[i].date)).setHours(12));
                        }
                        $scope.graphData = {
                            "dataset": $scope.history
                        };
                        $scope.graphOptions = {
                            margin: { top: 5 },
                            series: [
                                {
                                    axis: "y",
                                    dataset: "dataset",
                                    label: "Close",
                                    color: "#000",
                                    key: "close",
                                    type: ['line', 'dot'],
                                    id: "close_numbers"
                                },
                                {
                                    axis: "y",
                                    dataset: "dataset",
                                    label: "High/Low Range",
                                    color: 'lightgreen',
                                    key: { y0: 'low', y1: 'high' },
                                    type: ['area'],
                                    id: 'high_low_range'
                                }],
                            axes: {
                                x: {
                                    key: "trueDate",
                                    type: "date"
                                }
                            }
                        };
                    }
                    else
                        alert('No history found');
                });
            };
        }
        return MarketHistoryController;
    })();
    tradierApp.MarketHistoryController = MarketHistoryController;
    angular.module('tradeApp').controller('marketHistoryController', MarketHistoryController);
})(tradierApp || (tradierApp = {}));
///<reference path="../../utilities/urlBuilders/marketUrlBuilders.ts" />
var tradierApp;
(function (tradierApp) {
    var QuotesController = (function () {
        function QuotesController($scope, httpCallsService, $rootScope) {
            this.$scope = $scope;
            this.httpCallsService = httpCallsService;
            this.$rootScope = $rootScope;
            $scope.getQuote = function () {
                httpCallsService.get(UrlBuilder.getQuotes($scope.symbols), function (response) {
                    $scope.quotes = Helpers.getArray(response.data.quotes.quote);
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
//# sourceMappingURL=mainJS.js.map