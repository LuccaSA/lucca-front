import { OutputEmitterRef } from '@angular/core';

export interface ILuScrollable {
	onScroll: OutputEmitterRef<Event>;
	onScrollTop: OutputEmitterRef<Event>;
	onScrollBottom: OutputEmitterRef<Event>;
	onScrollLeft: OutputEmitterRef<Event>;
	onScrollRight: OutputEmitterRef<Event>;
}
