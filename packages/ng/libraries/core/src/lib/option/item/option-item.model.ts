import { Observable } from 'rxjs/Observable';

export interface ILuOptionItem<T = any> {
	onSelect: Observable<T>;
}
