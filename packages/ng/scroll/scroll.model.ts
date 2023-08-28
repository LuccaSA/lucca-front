import { Observable } from 'rxjs';

export interface ILuScrollable {
	onScroll: Observable<Event>;
	onScrollTop: Observable<Event>;
	onScrollBottom: Observable<Event>;
	onScrollLeft: Observable<Event>;
	onScrollRight: Observable<Event>;
}
