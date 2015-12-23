///<reference path="../../../TypeDefinitionFiles/angular.d.ts" />
module tradierApp{
	'use strict';
	interface ISearchCompanyScope extends ng.IScope{
		searchCompany:()=>void;
		query:string;
		includeIndexes:boolean;
		securities:Security[];
	}
	export class SearchCompanyController{
		public static $inject = ['httpCallsService','$scope'];
		constructor(private httpCallsService: HttpCallsService, private $scope : ISearchCompanyScope){
			$scope.searchCompany = function():void{
				httpCallsService.get(UrlBuilder.searchCompany($scope.query, $scope.includeIndexes), function(response){
					$scope.securities = <Security[]>response.data.securities;
				});
			};
		}
	}
	export function searchCompany():ng.IDirective{
		return {
			controller:"searchCompanyController",
			restrict:"E",
			templateUrl:"/scripts/modules/commonUtil/searchCompany.html",
			replace:true
		}
	}
	
	(function(angular){
		angular.module('tradeApp')
			.controller('searchCompanyController',SearchCompanyController)
			.directive('searchCompany',searchCompany);
	})(angular);
}