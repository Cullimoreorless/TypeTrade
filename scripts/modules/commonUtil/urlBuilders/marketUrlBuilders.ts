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
}