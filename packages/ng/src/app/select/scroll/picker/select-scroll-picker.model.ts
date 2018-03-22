import { Observable } from 'rxjs/Observable';

export interface ISelectScrollable<T> {
	loadMoreOptions(): Observable<T[]>;

}
