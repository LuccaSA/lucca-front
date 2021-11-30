import { DOCUMENT } from '@angular/common';
import {
	AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, forwardRef, Inject, OnDestroy, QueryList, ViewContainerRef
} from '@angular/core';
import { ALuPickerPanel } from '@lucca-front/ng/picker';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { merge, Observable } from 'rxjs';
import { delay, map, startWith, switchMap } from 'rxjs/operators';
import { ALuTreeOptionItem, ILuTreeOptionItem } from '../item/index';
import { ALuOptionPickerComponent } from './option-picker.component';
import { ILuTreeOptionPickerPanel } from './tree-option-picker.model';

enum ToggleMode {
	all,
	self,
	children,
}

@Directive()
export abstract class ALuTreeOptionPickerComponent<T = any, O extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>>
extends ALuOptionPickerComponent<T, O>
implements ILuTreeOptionPickerPanel<T>, OnDestroy, AfterViewInit {
	@ContentChildren(ALuTreeOptionItem, { descendants: true }) override set optionsQL(ql: QueryList<O>) {
		this._optionsQL = ql;
	}
	@ContentChildren(ALuTreeOptionItem, { descendants: true, read: ViewContainerRef }) optionsQLVR: QueryList<ViewContainerRef>;
	protected override set _options$(optionItems$: Observable<O[]>) {
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
		@Inject(DOCUMENT) document: Document,
	) {
		super(_changeDetectorRef, document);
	}
	protected override _toggle(option: O, mod = ToggleMode.all) {
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
		const selfSelected = values.some(v => this.optionComparer(v, value));
		const allChildrenSelected = allChildren.every(child => values.some(v => this.optionComparer(v, child)));
		if (selfSelected && allChildrenSelected) {
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
		const selfSelected = values.some(v => this.optionComparer(v, value));
		const someChildSelected = allChildren.some(child => values.some(v => this.optionComparer(v, child)));

		let newValues = this._remove(values, [...allChildren]);
		if (selfSelected && !someChildSelected) {
			// remove option
			newValues = this._remove(newValues, [value]);
		} else {
			// add option
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
		const selfSelected = values.some(v => this.optionComparer(v, value));
		let newValues = this._remove(values, [value]);
		const allChildrenSelected = allChildren.every(child => values.some(v => this.optionComparer(v, child)));
		if (allChildrenSelected && !selfSelected) {
			newValues = this._remove(newValues, allChildren);
		} else {
			newValues = this._add(newValues, allChildren);
		}
		this._select(newValues);
	}
	protected _add(values: T[], entries: T[]): T[] {
		const newEntries = entries.filter(entry => !values.some(v => this.optionComparer(v, entry)));
		return [...values, ...newEntries];
	}
	protected _remove(values: T[], entries: T[]): T[] {
		const entriesToKeep = values.filter(value => !entries.some(e => this.optionComparer(e, value)));
		return [...entriesToKeep];
	}

	protected override initItems() {

		const items$ = this._optionsQL.changes
			.pipe(
				startWith(this._optionsQL),
				map<QueryList<O>, O[]>(q => q.toArray()),
				map(roots => roots.map(r => [r, ...r.allChildren]).reduce((agg, val) => [...agg, ...val], [])),
				delay(0),
			);
		this._subs.add(items$.subscribe(o => this._options = o || []));
		this._options$ = items$;
	}
	override ngAfterViewInit() {
		this.initItems();
	}
}
/**
* basic tree option picker panel
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
		@Inject(DOCUMENT) document: Document,
	) {
		super(_changeDetectorRef, document);
	}
}
