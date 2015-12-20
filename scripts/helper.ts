module Helpers{
	export var authToken:string;
	export var baseApiUrl:string = "https://sandbox.tradier.com/";
	function getTradierAuthToken(){
		authToken = 'auth';
	};
}