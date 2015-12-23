///<reference path="../../../TypeDefinitionFiles/angular.d.ts" />
///<reference path="../../urlBuilders/marketUrlBuilders.ts" />
module tradierApp{
	export interface IQuoteCtrlScope extends angular.IScope{
		getQuote:()=> void;
		symbols?:any;
		quotes?:Object;
		
	}
	export class QuotesController{
		public static $inject = ['$scope','httpCallsService','$rootScope'];
		constructor(private $scope:IQuoteCtrlScope, private httpCallsService: HttpCallsService, private $rootScope : angular.IRootScopeService){
			$scope.getQuote = function(){
				if(!$scope.symbols) $scope.symbols='MSFT';
				httpCallsService.get(UrlBuilder.getQuotes($scope.symbols), function(response:IHttpResponse){
					$scope.quotes = response.data;
				});
			}
		}
	}
	(function(angular){
		angular.module('tradeApp')
			.controller('quotesController',QuotesController);
	})(angular);
}
