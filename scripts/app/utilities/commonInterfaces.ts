module tradierApp{
	export interface IHttpResponse extends ng.IHttpPromiseCallbackArg<any> {
		data:any;
	}
	export interface ISeriesOptions{
		axis:string;
		dataset:string;
		key:any;//can be a string for the property or a object {y0:'lowColName',y1:'highColName'} for range
		label:string;
		color:string;
		type:string[];
		id:string;
	}
	export interface IAxisOptions{
		key:string; 
		type?:string;//can be 'number','date' or 'log'
		min?:any;
		max?:any;
		ticks?:any[];
		ticksShift?:Object;
		tickFormat?:(value:any, index:number)=>any;
	}
	export interface IAxes{
		x?:IAxisOptions;
		y?:IAxisOptions;
	}
	export interface IGraphOptions {
		margin?:Object;
		series:ISeriesOptions[];
		axes:IAxes;
	}
}