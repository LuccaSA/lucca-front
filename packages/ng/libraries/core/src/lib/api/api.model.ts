export interface ICoerce<T> {
	clue: string;
	item: T | null;
}
export interface IApiItem<TId = number> {
	id: IApiItem;
	name?: string;
}
