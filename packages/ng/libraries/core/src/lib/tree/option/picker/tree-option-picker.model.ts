import { ILuOptionPickerPanel, ALuOptionPicker } from '../../../option/index';
import { Observable } from 'rxjs';
import { ILuTreeOptionItem } from '../item/index';
import { switchMap, merge } from 'rxjs/operators';

export interface ILuTreeOptionPickerPanel<T = any> extends ILuOptionPickerPanel<T> {}

export abstract class ALuTreeOptionPicker<T = any> extends ALuOptionPicker<T> implements ILuOptionPickerPanel<T> {
	protected set _optionItems$(optionItems$: Observable<ILuTreeOptionItem<T>[]>) {
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
			singleFlow$
			.subscribe((value: T) => this._updateValue(value))
		);
	}
}
