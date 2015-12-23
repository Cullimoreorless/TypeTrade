///<reference path="../helper.ts" />
(function(angular){
	'use strict';
	angular.module('tradeApp').config(['$httpProvider', function($httpProvider){
		$httpProvider.interceptors.push(['$q','$window','$location',
			function($q, $window, $location){
				return {
					'request':function(req){
						req.headers = req.headers || {};
						if(Helpers.authToken) req.headers.Authorization = 'Bearer ' + Helpers.authToken;
						req.headers.Accept = 'application/json';
						return req;
					}
				}
			}
		])
	}]);
	
})(angular);