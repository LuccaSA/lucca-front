import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class LuSelectPanelRef<TOption, TValue> {
	closed = new EventEmitter<void>();
	previousPage = new EventEmitter<void>();
	nextPage = new EventEmitter<void>();
	valueChanged = new EventEmitter<TValue>();
	clueChanged = new EventEmitter<string>();
	activeOptionIdChanged = new EventEmitter<string>();
	options$: Observable<TOption>;

	abstract handleKeyManagerEvent(event: KeyboardEvent): void;

	abstract emitValue(value: TValue): void;

	abstract selectCurrentlHiglightedValue(): void;

	close(): void {
		this.closed.next();
		this.closed.complete();
		this.nextPage.complete();
		this.previousPage.complete();
		this.valueChanged.complete();
		this.clueChanged.emit('');
		this.clueChanged.complete();
		this.activeOptionIdChanged.emit(undefined);
		this.activeOptionIdChanged.complete();
	}
}
