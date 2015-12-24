(function(angular){
	'use strict';
	angular.module('tradeApp').config(['$routeProvider',
		function($routeProvider){
			$routeProvider.when('/quotes',{
				templateUrl:'/scripts/modules/market/quotes.html',
				controller:'quotesController'
			}).when('/marketHistory',{
				templateUrl:'/scripts/modules/market/marketHistory.html',
				controller:'marketHistoryController'
			});
		}
	]);
	
})(angular);