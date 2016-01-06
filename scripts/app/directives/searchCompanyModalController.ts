

module tradierApp{
	'use strict';
	interface ISearchCompanyModalScope extends ng.IScope{
		closeWithSymbol:(newSymbol:string)=>void;
	}
	export class SearchCompanyModalController{
		public static $inject = ['$uibModalInstance','$scope'];
		constructor(private $uibModalInstance:ng.ui.bootstrap.IModalServiceInstance, 
		          private $scope:ISearchCompanyModalScope){
		  $scope.closeWithSymbol = function(newSymbol:string){
        $uibModalInstance.close(newSymbol);
      }				
		}
	}
  
  angular.module('tradeApp').controller('searchCompanyModalController', SearchCompanyModalController);
}