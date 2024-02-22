export interface ILuApiSuggestion<T> {
	relevance: unknown; // TODO
	item: T;
}
export interface ILuApiItem<TId = number> {
	id: TId;
	name?: string;
}
export interface ILuApiResponse<D> {
	data: D;
}
export type ILuApiCollectionResponse<T> = ILuApiResponse<{ items: T[] }>;
