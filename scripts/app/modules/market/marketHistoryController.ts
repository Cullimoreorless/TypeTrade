///<reference path="../../utilities/urlBuilders/marketUrlBuilders.ts" />
///<reference path="../../utilities/commonInterfaces.ts"/>
///<reference path="../../../helper.ts"/>
module tradierApp{
	interface IMarketHistoryScope extends ng.IScope{
		symbol:string;
		startDate:Date;
		endDate:Date;
		interval:string;
		history:any;
		getHistory():void;
		endOpen:boolean;
		startOpen:boolean;
		today:Date;
		graphData:Object;
		graphOptions:IGraphOptions;
		open(type:string, event:any):void;
	}
	
	export class MarketHistoryController{
		constructor(private $scope:IMarketHistoryScope, private httpCallsService:HttpCallsService){
			$scope.endOpen = false;
			$scope.startOpen = false;
			$scope.today = new Date();
			$scope.open = function(type:string, event:any):void{
				switch(type){
					case 'sd':
						$scope.startOpen = true;
						$scope.endOpen = false;
						break;
					case 'ed':
						$scope.startOpen = false;
						$scope.endOpen = true;
						break;
				}
			};
			$scope.getHistory = function(){
				var start = Helpers.getISODateString($scope.startDate),
					end = Helpers.getISODateString($scope.endDate);
				httpCallsService.get(UrlBuilder.getHistory($scope.symbol, $scope.interval, start, end),
					function(response){
						if(response.data.history){
							$scope.history = Helpers.getArray(response.data.history.day);
							$scope.graphData = {
								"dataset": $scope.history
							};
							$scope.graphOptions = null;
						}
						else
							alert('No history found');
					}
				);
			};
		}
	}
	
	angular.module('tradeApp').controller('marketHistoryController',MarketHistoryController);
}