module tradierApp{
	export interface IHttpResponse extends ng.IHttpPromiseCallbackArg<any> {
		data:any;
	}
	export interface ISeriesOptions{
		axis:string;
		dataset:string;
		key:string;
		label:string;
		color:string;
		type:string[];
		id:string;
	}
	export interface IAxisOptions{
		x?:{key:string}
		y?:{key:string}
	}
	export interface IGraphOptions {
		series:ISeriesOptions[];
		axes:IAxisOptions
	}
}