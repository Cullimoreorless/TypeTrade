module Helpers{
	export var authToken:string = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
	export var baseApiUrl:string = "https://sandbox.tradier.com/v1/";
	function getTradierAuthToken(){
		//TODO: authorization calls
		authToken = 'eeRpHhQdzrrHdyukEdib4fRngdFF';
	};
	export function setOrPushArray(arrayToSet, result){
		arrayToSet = [];
		if(Array.isArray(result))
			arrayToSet = result;
		else
			arrayToSet.push(result);
	}
	export function getArray(resultSet:any):any[]{
		var rtnArray:any = [];
		if(Array.isArray(resultSet))
			return resultSet;
		else{
			rtnArray.push(resultSet);
			return rtnArray;
		}
	}
	export function getISODateString(date:Date):string{
		var year = date.getFullYear().toString(),
			month = date.getMonth() + 1,
			day = date.getDate();
		return year+'-'+(month < 10 ? '0'+month: month)+'-'+(day < 10 ? '0'+day:day);
	}
}