module UrlBuilder{
	//specifically for market operations
	export function getQuotes(symbols:string):string{
		return 'markets/quotes?symbols='+symbols;
	};
	export function searchCompany(query:string, includeIndex:boolean):string{
		if(!includeIndex)
			includeIndex = false;
		return 'markets/search?q='+query+'&indexes='+includeIndex.toString();
	};
	export function getHistory(symbol:string, interval?:string, start?:string, end?:string):string{
		return 'markets/history?symbol='+symbol+(interval ? '&interval='+interval:'')+(start ? '&start='+start:'')+(end ? '&end='+end:'');
	}
}