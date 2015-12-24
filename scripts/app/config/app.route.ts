(function(angular){
	'use strict';
	angular.module('tradeApp').config(['$routeProvider',
		function($routeProvider){
			$routeProvider.when('/market/quotes',{
				templateUrl:'/scripts/app/modules/market/quotes.html',
				controller:'quotesController'
			}).when('/market/history',{
				templateUrl:'/scripts/app/modules/market/marketHistory.html',
				controller:'marketHistoryController'
			});
		}
	]);
	
})(angular);