///<reference path="../TypeDefinitionFiles/angular.d.ts"/>
module Helpers{
	export var authToken:string = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
	export var baseApiUrl:string = "https://sandbox.tradier.com/v1/";
	function getTradierAuthToken(){
		//TODO: authorization calls
		authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
	};
}
module tradierApp{
	export interface IHttpResponse extends angular.IHttpPromiseCallbackArg<any> {
		data:any;
	}
}