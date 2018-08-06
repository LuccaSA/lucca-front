import { Observable } from 'rxjs/Observable';

export interface ILuClearer<T = any> {
	onClear: Observable<T>;
}
export abstract class ALuClearer<T = any> implements ILuClearer<T> {
	onClear: Observable<T>;
}
