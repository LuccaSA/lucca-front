import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, AfterViewInit, ContentChildren, ViewContainerRef, QueryList } from '@angular/core';
import { luTransformPopover } from '../../../overlay/index';
import { ALuPickerPanel } from '../../../input/index';
import { LuOptionPickerComponent } from '../../../option/index';
import { ILuTreeOptionPickerPanel } from './tree-option-picker.model';
import { ILuTreeOptionItem, ALuTreeOptionItem } from '../item';
import { Observable, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
* basic option picker panel
*/
@Component({
	selector: 'lu-tree-option-picker',
	templateUrl: './tree-option-picker.component.html',
	styleUrls: ['./tree-option-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuTreeOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuTreeOptionPickerComponent),
		},
	]
})
export class LuTreeOptionPickerComponent<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>>
extends LuOptionPickerComponent<T, I>
implements ILuTreeOptionPickerPanel<T, I>, OnDestroy, AfterViewInit {
	@ContentChildren(ALuTreeOptionItem, { descendants: true }) set optionsQL(ql: QueryList<I>) {
		this._optionsQL = ql;
		this.initOptionItemsObservable();
	}
	@ContentChildren(ALuTreeOptionItem, { descendants: true, read: ViewContainerRef }) optionsQLVR: QueryList<ViewContainerRef>;
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
		const value = option.value;
		if (!this.multiple) {
			this._select(value);
			return;
		}
		const children = option.childrenOptionItems.map(i => i.value);
		const values = <T[]>this._value || [];
		if (values.some(v => JSON.stringify(v) === JSON.stringify(value))) {
			
		}
	}
}
