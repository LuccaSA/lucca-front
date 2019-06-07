import { ILuOptionPickerPanel, ALuOptionPicker } from '../../../option/index';
import { Observable } from 'rxjs';
import { ILuTreeOptionItem } from '../item/index';
import { switchMap, merge } from 'rxjs/operators';

export interface ILuTreeOptionPickerPanel<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ILuOptionPickerPanel<T, I> {}

export abstract class ALuTreeOptionPicker<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ALuOptionPicker<T, I> implements ILuTreeOptionPickerPanel<T, I> {
	protected set _optionItems$(optionItems$: Observable<I[]>) {
		// reapply selected when the options change
		this._subs.add(
			optionItems$
			.subscribe(o => this._applySelected())
		);
		// subscribe to any option.onSelect
		const singleFlowSelect$ = optionItems$.pipe(switchMap(
			items => merge(...items.map(i => i.onSelect))
		));
		this._subs.add(
			singleFlowSelect$
			.subscribe(option => this._updateValue(option))
		);
	}
	protected _updateValue(option: I) {

	}
}
