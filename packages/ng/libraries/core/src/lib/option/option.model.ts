import { Observable } from 'rxjs/Observable';

export interface ILuOption<T = any> {
	onSelect: Observable<T>;
}
