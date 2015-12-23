(function(angular){
	'use strict';
	angular.module('tradeApp').config(['$routeProvider',
		function($routeProvider){
			$routeProvider.when('quotes',{
				templateUrl:'/scripts/modules/api/quotes.html',
				controller:'quotesController'
			});
		}
	]);
	
})(angular);