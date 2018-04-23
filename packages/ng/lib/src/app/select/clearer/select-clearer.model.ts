export interface ISelectClearer<T> {
	subscribe(next: (T) => void);

	clearValue(): T;

	canRemove(remove: boolean);
}
