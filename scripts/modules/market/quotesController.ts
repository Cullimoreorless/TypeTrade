///<reference path="../commonUtil/urlBuilders/marketUrlBuilders.ts" />
module tradierApp{
	export interface IQuoteCtrlScope extends angular.IScope{
		getQuote:()=> void;
		symbols:string;
		quotes?:IQuoteResponse[];
	}
	export class QuotesController{
		public static $inject = ['$scope','httpCallsService','$rootScope'];
		constructor(private $scope:IQuoteCtrlScope, private httpCallsService: HttpCallsService, private $rootScope : angular.IRootScopeService){
			$scope.getQuote = function(){
				if(!$scope.symbols) $scope.symbols='MSFT';
				httpCallsService.get(UrlBuilder.getQuotes($scope.symbols), function(response:IHttpResponse){
					$scope.quotes = [];
					var q = response.data.quotes.quote;
					if(Array.isArray(q))
						$scope.quotes = q;
					else
						$scope.quotes.push(q);
				});
			}
		}
	}
	(function(angular){
		angular.module('tradeApp')
			.controller('quotesController',QuotesController);
	})(angular);
}
