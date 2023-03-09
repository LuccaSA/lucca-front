import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class LuSelectPanelRef<T> {
	closed = new EventEmitter<void>();
	previousPage = new EventEmitter<void>();
	nextPage = new EventEmitter<void>();
	valueChanged = new EventEmitter<T>();
	clueChanged = new EventEmitter<string>();
	activeOptionIdChanged = new EventEmitter<string>();
	options$: Observable<T>;

	abstract emitValue(value: T): void;
	close(): void {
		this.closed.next();
		this.closed.complete();
		this.nextPage.next();
		this.nextPage.complete();
		this.previousPage.next();
		this.previousPage.complete();
		this.valueChanged.complete();
		this.clueChanged.emit(null);
		this.clueChanged.complete();
		this.activeOptionIdChanged.emit(undefined);
		this.activeOptionIdChanged.complete();
	}
}
