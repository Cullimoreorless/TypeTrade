///<reference path="../../common.ts" />
(function(angular){
	'use strict';
	angular.module('tradeApp').config(['$httpProvider', function($httpProvider){
		$httpProvider.interceptors.push(['$q','$window','$location',
			function($q, $window, $location){
				return {
					'request':function(req){
						req.headers = req.headers || {};
						if(common.authToken) req.headers.Authorization = 'Bearer ' + common.authToken;
						req.headers.Accept = 'application/json';
						return req;
					}
				}
			}
		])
	}]);
	
})(angular);