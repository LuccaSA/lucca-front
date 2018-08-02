export interface ICoerce<T> {
	clue: string;
	item: T | null;
}
export interface IApiItem<TId = number> {
	id: TId;
	name?: string;
}
export interface IApiCollectionResponse<T extends IApiItem = IApiItem> {
	items: T[];
}
