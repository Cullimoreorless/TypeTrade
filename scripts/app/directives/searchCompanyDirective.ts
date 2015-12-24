module tradierApp{
	'use strict';
	interface ISearchCompanyScope extends ng.IScope{
		searchCompanies():void;
		query:string;
		includeIndexes:boolean;
		securities:Security[];
		addSymbol(newSymbol:string):void;
		symbols:string;
	}
	export class SearchCompanyController{
		public static $inject = ['httpCallsService','$scope'];
		constructor(private httpCallsService: HttpCallsService, private $scope : ISearchCompanyScope){
			$scope.symbols = "";
			$scope.searchCompanies = function():void{
				httpCallsService.get(UrlBuilder.searchCompany($scope.query, $scope.includeIndexes), function(response){
					$scope.securities = Helpers.getArray(response.data.securities.security);
				});
			};
			$scope.addSymbol = function(newSymbol:string){
				if($scope.symbols.length != 0)
					$scope.symbols += ',';
				$scope.symbols += newSymbol;
			}
		}
	}
	export function searchCompany():ng.IDirective{
		return {
			controller:"searchCompanyController",
			restrict:"E",
			scope:{
				symbols:"="
			},
			templateUrl:"/scripts/app/directives/searchCompany.html",
			replace:true
		}
	}
	
	(function(angular){
		angular.module('tradeApp')
			.controller('searchCompanyController',SearchCompanyController)
			.directive('searchCompany',searchCompany);
	})(angular);
}