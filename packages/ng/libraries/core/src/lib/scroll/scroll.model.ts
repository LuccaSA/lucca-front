import { Observable } from 'rxjs/Observable';

export interface ILuScrollable {
	onScroll: Observable<Event>;
	onScrollTop: Observable<Event>;
	onScrollBottom: Observable<Event>;
	onScrollLeft: Observable<Event>;
	onScrollRight: Observable<Event>;
}
