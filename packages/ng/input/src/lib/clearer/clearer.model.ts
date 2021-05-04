import { Observable } from 'rxjs';

export interface ILuClearer<T = any> {
	onClear: Observable<T>;
}
export abstract class ALuClearer<T = any> implements ILuClearer<T> {
	onClear: Observable<T>;
}
