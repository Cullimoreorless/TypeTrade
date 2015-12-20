/// <reference path="../../../TypeDefinitionFiles/angular.d.ts" />
/// <reference path="../../helper.ts" />
(function(angular){
	angular.module('tradierApp').factory('httpCallsFactory',['$scope','$http',
		function($scope, $http){
			
			var get = function(url:string, callback:(response:any) => void){
			 	$http.get(url).then(function(response){
					 callback(response);
				 });
			};
			return {
				"get": get
			};
		}
	]);
})(angular);