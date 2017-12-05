export interface IApiItem {
	id: number;
	name?: string;
}
export interface ICoerce<T> {
	clue: string;
	item: T | null;
}
