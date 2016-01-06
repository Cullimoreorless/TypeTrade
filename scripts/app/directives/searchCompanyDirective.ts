module tradierApp{
	'use strict';
	interface ISearchCompanyScope extends ng.IScope{
		searchCompanies():void;
		query:string;
		includeIndexes:boolean;
		securities:Security[];
		symbols:string;
    symbolAction:(newSymbol:string)=>void;
    clickSymbol:(newSymbol:string)=>void;
	}
	export class SearchCompanyController{
		public static $inject = ['httpCallsService','$scope'];
		constructor(private httpCallsService: HttpCallsService, private $scope : ISearchCompanyScope){
			$scope.symbols = "";
			$scope.searchCompanies = function():void{
				httpCallsService.get(UrlBuilder.searchCompany($scope.query, $scope.includeIndexes), function(response){
					$scope.securities = common.getArray(response.data.securities.security);
				});
			};
      $scope.clickSymbol = function (newSymbol:string){
        $scope.symbolAction(newSymbol);
      }
		}
	}
	export function searchCompany():ng.IDirective{
		return {
			controller:"searchCompanyController",
			restrict:"E",
			scope:{
				symbolAction:'='
			},
			templateUrl:"/scripts/app/directives/searchCompany.html?1",
			replace:true
		}
	}
	
	(function(angular){
		angular.module('tradeApp')
			.controller('searchCompanyController',SearchCompanyController)
			.directive('searchCompany',searchCompany);
	})(angular);
}