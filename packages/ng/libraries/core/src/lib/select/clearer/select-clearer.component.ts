import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	EventEmitter
} from '@angular/core';
import { ISelectClearer } from './select-clearer.model';

@Component({
	selector: 'lu-select-clearer',
	templateUrl: 'select-clearer.component.html',
	styleUrls: ['select-clearer.component.scss'],
	moduleId: module.id,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'luSelectClearer',
})
/**
 * Component that manage the possibility to clear a select. null value will be set when we click on it
 */
export class LuSelectClearerComponent<T> implements ISelectClearer<T> {
	@HostBinding('class.is-clearable') modRemove = false;

	private _emitter: (T) => void;

	constructor() {}

	subscribe(next: (T) => void) {
		this._emitter = next;
		this._clear(null);
	}

	clearValue(): T {
		return null;
	}

	canRemove(remove: boolean) {
		this.modRemove = remove;
	}

	/**
	 *
	 */
	_clear($event): void {
		if (this._emitter) {
			this._emitter(this.clearValue());
		}
		if ($event) {
			$event.stopPropagation();
		}
	}
}
