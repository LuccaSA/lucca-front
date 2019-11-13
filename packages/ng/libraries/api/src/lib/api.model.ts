export interface ISuggestion<T> {
	relevance: any;
	item: T;
}
export interface IApiItem<TId = number> {
	id: TId;
	name?: string;
}
export interface IApiResponse<D = any> {
	data: D;
}
export interface IApiCollectionResponse<T extends IApiItem = IApiItem> extends IApiResponse<{ items: T[] }> {}
