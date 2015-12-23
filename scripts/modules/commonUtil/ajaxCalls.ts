/// <reference path="../../../TypeDefinitionFiles/angular.d.ts" />
/// <reference path="../../helper.ts" />
module tradierApp{
	'use strict';
	export class HttpCallsService {
		public static $inject = ['$http'];
		http:ng.IHttpService;
		constructor(private $http : angular.IHttpService){
			this.http = $http;
		};
		get(url:string, callback:(response:IHttpResponse)=>void):void{
			this.http.get(Helpers.baseApiUrl + url).then(function(response){
				callback(<IHttpResponse>response);
			}, function(reason) { alert(reason); });
		}
	}
	(function(angular){
		angular.module('tradeApp')
			.service('httpCallsService',HttpCallsService);
	})(angular);
}