///<reference path="../../utilities/urlBuilders/marketUrlBuilders.ts" />
///<reference path="../../utilities/commonInterfaces.ts"/>
///<reference path="../../../common.ts"/>
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
		openSearchCompanyModal():void;
		chooseSymbol(newSymbol:string):void;
	}
	
	export class MarketHistoryController{
		public static $inject = ['$scope','httpCallsService','$uibModal'];
		constructor(private $scope:IMarketHistoryScope, 
					private httpCallsService:HttpCallsService, 
					private $uibModal:ng.ui.bootstrap.IModalService){
			$scope.endOpen = false;
			$scope.startOpen = false;
			$scope.today = new Date();
      $scope.endDate = $scope.today;
      $scope.startDate = new Date();
      $scope.startDate = common.addDaysToDate(-30, $scope.startDate);
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
			$scope.chooseSymbol = function(newSymbol:string){
				$scope.symbol = newSymbol;
			};
			$scope.openSearchCompanyModal = function(){
				var modal = $uibModal.open({
					templateUrl:'/scripts/app/directives/searchCompanyModal.html',
					controller:'searchCompanyModalController',
          size:'lg'
					//TODO add controller, sort out symbol passing between here, modal, directive within modal
				});
        modal.result.then(function(newSymbol){
          if(newSymbol){
            $scope.symbol = newSymbol;
          }
        })
			}
			$scope.getHistory = function(){
				var start = common.getISODateString($scope.startDate),
					end = common.getISODateString($scope.endDate);
				httpCallsService.get(UrlBuilder.getHistory($scope.symbol, $scope.interval, start, end),
					function(response){
						if(response.data.history){
							$scope.history = common.getArray(response.data.history.day);
							for(var i = $scope.history.length - 1; i >= 0; i--){
								$scope.history[i].trueDate = new Date((new Date($scope.history[i].date)).setUTCHours(12));
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
										key:"close", //this series shows the amount for the stock at close of market
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
									}
								],
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