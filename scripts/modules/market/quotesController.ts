///<reference path="../commonUtil/urlBuilders/marketUrlBuilders.ts" />
module tradierApp{
	export interface IQuoteCtrlScope extends angular.IScope{
		getQuote:()=> void;
		symbols:string;
		quotes?:IQuoteResponse[];
	}
	export class QuotesController{
		public static $inject = ['$scope','httpCallsService','$rootScope'];
		constructor(private $scope:IQuoteCtrlScope, 
					private httpCallsService: HttpCallsService, 
					private $rootScope : angular.IRootScopeService){
			$scope.getQuote = function(){
				httpCallsService.get(UrlBuilder.getQuotes($scope.symbols), function(response:IHttpResponse){
					$scope.quotes = Helpers.getArray(response.data.quotes.quote);
				});
			}
		}
	}
	(function(angular){
		angular.module('tradeApp')
			.controller('quotesController',QuotesController);
	})(angular);
}
