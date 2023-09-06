import { EventEmitter } from '@angular/core';
import { LuSelectPanelRef } from '@lucca-front/ng/core-select';
import { Observable } from 'rxjs';

export abstract class LuMultiSelectPanelRef<T> extends LuSelectPanelRef<T, T[]> {
	selectAll = new EventEmitter<void>();

	areAllOptionsSelected$: Observable<boolean | undefined>;

	override close(): void {
		super.close();
		this.selectAll.complete();
	}

	abstract updateSelectedOptions(selectedOptions: T[]): void;

	abstract useExpandedPosition(): void;

	abstract useDefaultPosition(): void;
}
