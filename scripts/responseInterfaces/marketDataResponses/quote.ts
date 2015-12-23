module tradierApp{
	interface QuoteResponse{
		symbol:string;
		description:string;
		exch:string; //Exchange
		type:string; //Type of security (i.e. stock, etf, option, index)
		change: number;//Daily net change
		change_percentage:number;//Daily net change
		volume:number;//Volume for the day
		average_volume:number;//Average daily volume
		last_volume:number;//Last incremental volume
		trade_date:number;//Date and time of last trade
		open:number;//Opening price
		high:number;//Trading day high
		low:number;//Trading day low
		close:number;//Closing price
		prevclose:number;//Previous closing price
		week_52_high:number;//52 week high
		week_52_low: number;//52 week low
		bid:number;//Current bid
		bidsize:number;//Size of bid
		bidexch:string;//Exchange of bid
		bid_date:number;//Date and time of current bid
		ask:number;//Current ask
		asksize:number;//Size of ask
		askexch:string;//Exchange of ask
		ask_date:number;//Date and time of current ask
		open_interest:number;//Open interest
		root_symbols:string;//Underlying symbol
		expiration_date:number;
		expiration_type:string;//Type of expiration (standard, weekly)
		option_type:string;
	}
}