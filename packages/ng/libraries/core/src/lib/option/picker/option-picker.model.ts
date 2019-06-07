import { ILuPickerPanel, ALuPickerPanel } from '../../input/index';
import { Subscription, Observable, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ILuOptionItem } from '../item/index';
import { ESCAPE, TAB } from '@angular/cdk/keycodes';

export interface ILuOptionPickerPanel<T = any> extends ILuPickerPanel<T> {}

export abstract class ALuOptionPicker<T = any> extends ALuPickerPanel<T> implements ILuOptionPickerPanel<T> {
	protected _subs = new Subscription();
	onSelectValue: Observable<T | T[]>;
	protected _value: T | T[];
	setValue(value: T | T[]) {
		this._value = value;
		this._applySelected();
	}
	protected set _optionItems$(optionItems$: Observable<ILuOptionItem<T>[]>) {
		// reapply selected when the options change
		this._subs.add(
			optionItems$
			.subscribe(o => this._applySelected())
		);
		// subscribe to any option.onSelect
		const singleFlow$ = optionItems$.pipe(switchMap(
			items => merge(...items.map(i => i.onSelect))
		));
		this._subs.add(
			singleFlow$.subscribe(option => this._updateValue(option.value)),
		);
	}
	protected _updateValue(value: T) {
		if (!this.multiple) {
			this._select(value);
		} else {
			const values = <T[]>this._value || [];
			let newValues;
			if (values.some(v => JSON.stringify(v) === JSON.stringify(value))) {
				// value was present, we remove it
				newValues = values.filter(v => JSON.stringify(v) !== JSON.stringify(value));
			} else {
				// value was absent, we add it
				newValues = [...values, value];
			}
			this._select(newValues);
		}
	}

	protected _select(val: T | T[]) {
		this._emitSelectValue(val);
		if (!this.multiple) {
			this._emitCloseEvent();
		}
	}
	protected abstract _applySelected();
	protected destroy() {
		this._subs.unsubscribe();
	}
	_handleKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case ESCAPE:
				this._emitCloseEvent();
				event.preventDefault();
				event.stopPropagation();
				break;
			case TAB:
				this._emitCloseEvent();
				break;
		}
	}

	protected abstract _emitSelectValue(value: T | T[]);
}
