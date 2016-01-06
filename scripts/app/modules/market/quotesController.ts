///<reference path="../../utilities/urlBuilders/marketUrlBuilders.ts" />
module tradierApp{
	export interface IQuoteCtrlScope extends angular.IScope{
		getQuote:()=> void;
		symbols:string;
		quotes?:IQuoteResponse[];
		addSymbol(newSymbol:string):void;
	}
	export class QuotesController{
		public static $inject = ['$scope','httpCallsService','$rootScope'];
		constructor(private $scope:IQuoteCtrlScope, 
					private httpCallsService: HttpCallsService, 
					private $rootScope : angular.IRootScopeService){
			$scope.getQuote = function(){
				httpCallsService.get(UrlBuilder.getQuotes($scope.symbols), function(response:IHttpResponse){
					$scope.quotes = common.getArray(response.data.quotes.quote);
				});
			};
			$scope.addSymbol = function(newSymbol:string){
				if($scope.symbols.length != 0)
					$scope.symbols += ',';
				$scope.symbols += newSymbol;
			}
		}
	}
	(function(angular){
		angular.module('tradeApp')
			.controller('quotesController',QuotesController);
	})(angular);
}
