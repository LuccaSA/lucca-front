import { Observable } from 'rxjs';

export interface ILuClear<T> {
	onClear: Observable<T>;
}

export abstract class ALuClear<T> implements ILuClear<T> {
	onClear: Observable<T>;
}
