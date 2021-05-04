export interface ILuApiSuggestion<T> {
	relevance: any;
	item: T;
}
export interface ILuApiItem<TId = number> {
	id: TId;
	name?: string;
}
export interface ILuApiResponse<D = any> {
	data: D;
}
export interface ILuApiCollectionResponse<T extends ILuApiItem = ILuApiItem> extends ILuApiResponse<{ items: T[] }> {}
