import { Observable } from 'rxjs';

export interface ILuClearer<T> {
	onClear: Observable<T>;
}
export abstract class ALuClearer<T> implements ILuClearer<T> {
	onClear: Observable<T>;
}
