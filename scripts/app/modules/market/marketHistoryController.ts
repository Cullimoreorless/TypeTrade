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
							for(var i = $scope.history.length - 1; i >= 0; i--){
								$scope.history[i].trueDate = new Date((new Date($scope.history[i].date)).setHours(12));
							}
							$scope.graphData = {
								"dataset": $scope.history
							};
							$scope.graphOptions = {
								margin:{top:5},
								series: [
									{
									axis:"y",
									dataset:"dataset",
									label:"Close",
									color:"#000",
									key:"close",
									type:['line','dot'],
									id:"close_numbers"
								},
								{
									axis:"y",
									dataset:"dataset",
									label:"High/Low Range",
									color:'lightgreen',
									key:{y0:'low',y1:'high'},
									type:['area'],
									id:'high_low_range'	
								}],
								axes:{
									x:{
										key:"trueDate",
										type:"date"
									}
								}
							};
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