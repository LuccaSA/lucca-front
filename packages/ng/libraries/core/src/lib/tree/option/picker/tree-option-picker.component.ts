import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	OnDestroy,
	AfterViewInit,
	ContentChildren,
	ViewContainerRef,
	QueryList,
	ChangeDetectorRef,
	Renderer2,
} from '@angular/core';
import { luTransformPopover } from '../../../overlay/index';
import { ALuPickerPanel } from '../../../input/index';
import { ALuOptionPickerComponent } from '../../../option/index';
import { ILuTreeOptionPickerPanel } from './tree-option-picker.model';
import { ILuTreeOptionItem, ALuTreeOptionItem } from '../item/index';
import { Observable, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

enum ToggleMode {
	all,
	self,
	children,
}

export abstract class ALuTreeOptionPickerComponent<T = any, O extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>>
extends ALuOptionPickerComponent<T, O>
implements ILuTreeOptionPickerPanel<T, O>, OnDestroy, AfterViewInit {
	@ContentChildren(ALuTreeOptionItem, { descendants: true }) set optionsQL(ql: QueryList<O>) {
		this._optionsQL = ql;
		this.initOptionItemsObservable();
	}
	@ContentChildren(ALuTreeOptionItem, { descendants: true, read: ViewContainerRef }) optionsQLVR: QueryList<ViewContainerRef>;
	protected set _optionItems$(optionItems$: Observable<O[]>) {
		// reapply selected when the options change
		this._subs.add(
			optionItems$
			.subscribe(o => this._applySelected())
		);
		// subscribe to any option.onSelect
		const singleFlowSelect$ = optionItems$.pipe(switchMap(
			items => merge(...items.map(i => i.onSelect))
		));
		const singleFlowSelectSelf$ = optionItems$.pipe(switchMap(
			items => merge(...items.map(i => i.onSelectSelf))
		));
		const singleFlowSelectChildren$ = optionItems$.pipe(switchMap(
			items => merge(...items.map(i => i.onSelectChildren))
		));

		this._subs.add(
			singleFlowSelect$
			.subscribe(option => this._toggle(option, ToggleMode.all))
		);
		this._subs.add(
			singleFlowSelectSelf$
			.subscribe(option => this._toggle(option, ToggleMode.self))
		);
		this._subs.add(
			singleFlowSelectChildren$
			.subscribe(option => this._toggle(option, ToggleMode.children))
		);
	}
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_renderer: Renderer2,
	) {
		super(_changeDetectorRef, _renderer);
	}
	protected _toggle(option: O, mod = ToggleMode.all) {
		switch (mod) {
			case ToggleMode.self:
				return this._toggleSelf(option);
			case ToggleMode.children:
				return this._toggleChildren(option);
			case ToggleMode.self:
			default:
				return this._toggleAll(option);
		}
	}
	protected _toggleAll(option: O) {
		const value = option.value;
		if (!this.multiple) {
			this._select(value);
			return;
		}
		const allChildren = option.allChildren.map(i => i.value);
		const values = <T[]>this._value || [];
		let newValues;
		if (values.some(v => JSON.stringify(v) === JSON.stringify(value))) {
			// remove option and its children
			newValues = this._remove(values, [value, ...allChildren]);
		} else {
			// add option and its children
			newValues = this._add(values, [value, ...allChildren]);
		}
		this._select(newValues);
	}
	protected _toggleSelf(option: O) {
		const value = option.value;
		if (!this.multiple) {
			this._select(value);
			return;
		}
		const allChildren = option.allChildren.map(i => i.value);
		const values = <T[]>this._value || [];
		let newValues = this._remove(values, [...allChildren]);
		if (values.some(v => JSON.stringify(v) === JSON.stringify(value))) {
			// remove option and its children
			newValues = this._remove(newValues, [value]);
		} else {
			// add option and its children
			newValues = this._add(newValues, [value]);
		}
		this._select(newValues);
	}
	protected _toggleChildren(option: O) {
		const value = option.value;
		if (!this.multiple) {
			this._select(value);
			return;
		}
		const allChildren = option.allChildren.map(i => i.value);
		const values = <T[]>this._value || [];
		const parentSelected = values.some(v => JSON.stringify(v) === JSON.stringify(value));
		let newValues = this._remove(values, [value]);
		const allChildrenSelected = allChildren.every(child => values.some(v => JSON.stringify(v) === JSON.stringify(child)));
		if (allChildrenSelected && !parentSelected) {
			newValues = this._remove(newValues, allChildren);
		} else {
			newValues = this._add(newValues, allChildren);
		}
		this._select(newValues);
	}
	protected _add(values: T[], entries: T[]): T[] {
		const newEntries = entries.filter(entry => !values.some(v => JSON.stringify(v) === JSON.stringify(entry)));
		return [...values, ...newEntries];
	}
	protected _remove(values: T[], entries: T[]): T[] {
		const entriesToKeep = values.filter(value => !entries.some(e => JSON.stringify(e) === JSON.stringify(value)));
		return [...entriesToKeep];
	}
}
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
export class LuTreeOptionPickerComponent<T = any, O extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>>
extends ALuTreeOptionPickerComponent<T, O> {
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_renderer: Renderer2,
	) {
		super(_changeDetectorRef, _renderer);
	}
}
