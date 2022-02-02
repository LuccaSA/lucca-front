import { ALuPickerPanel, ILuPickerPanel } from '@lucca-front/ng/picker';
import { merge, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ILuOptionItem } from '../item/option-item.model';

export type ILuOptionPickerPanel<T> = ILuPickerPanel<T>;

export type LuOptionComparer<T> = (option1: T, option2: T) => boolean;

export abstract class ALuOptionPicker<T, O extends ILuOptionItem<T> = ILuOptionItem<T>>
	extends ALuPickerPanel<T>
	implements ILuOptionPickerPanel<T>
{
	protected _subs = new Subscription();
	override onSelectValue: Observable<T | T[]>;
	protected _value: T | T[];
	setValue(value: T | T[]) {
		this._value = value;
		this._applySelected();
	}
	private __options$: Observable<O[]>;
	protected get _options$() {
		return this.__options$;
	}
	protected set _options$(options$: Observable<O[]>) {
		this.__options$ = options$;
		// reapply selected when the options change
		this._subs.add(
			options$.subscribe(() => {
				this._applySelected();
				this._applyHighlight();
			}),
		);
		// subscribe to any option.onSelect
		const singleFlow$ = options$.pipe(switchMap((items) => merge(...items.map((i) => i.onSelect))));
		this._subs.add(singleFlow$.subscribe((option) => this._toggle(option)));
	}
	protected optionComparer: LuOptionComparer<T> = (option1: T, option2: T) => JSON.stringify(option1) === JSON.stringify(option2);
	protected _toggle(option: O) {
		const value = option.value;
		if (!this.multiple) {
			this._select(value);
		} else {
			const values = <T[]>this._value || [];
			let newValues: T[];
			if (values.some((v) => this.optionComparer(v, value))) {
				// value was present, we remove it
				newValues = values.filter((v) => !this.optionComparer(v, value));
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
	protected abstract _applyHighlight();
	protected destroy() {
		this._subs.unsubscribe();
	}
	override _handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				this._emitCloseEvent();
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'Tab':
				this._emitCloseEvent();
				break;
		}
	}

	protected abstract _emitSelectValue(value: T | T[]);
}
