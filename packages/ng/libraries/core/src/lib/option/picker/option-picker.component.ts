import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	ContentChildren,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	ElementRef,
} from '@angular/core';
import { luTransformPopover } from '../../popover/index';
import { ILuOptionItem, ALuOptionItem } from '../item/index';
import { ILuOptionPickerPanel, ALuOptionPicker } from './option-picker.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { ALuPickerPanel, ALuInputDisplayer, ILuInputDisplayer } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator } from '../operator/index';

/**
* basic option picker panel
*/
@Component({
	selector: 'lu-option-picker',
	templateUrl: './option-picker.component.html',
	styleUrls: ['./option-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuOptionPickerComponent),
		},
		{
			provide: ALuInputDisplayer,
			useExisting: forwardRef(() => LuOptionPickerComponent),
			multi: true,
		},
	]
})
export class LuOptionPickerComponent<T = any>
extends ALuOptionPicker<T>
implements ILuOptionPickerPanel<T>, OnDestroy, ILuInputDisplayer<T> {
	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();
	@Output() onSelectValue = new EventEmitter<T>();
	setValue(value: T) {}
	constructor(protected _vcr: ViewContainerRef) {
		super();
		this.triggerEvent = 'click';
	}
	protected _options: ILuOptionItem<T>[];
	@ContentChildren(ALuOptionItem, { descendants: true }) set optionsQL(ql: QueryList<ILuOptionItem<T>>) {
		this._optionItems$ =
			merge(Observable.of(ql), ql.changes)
			.map<QueryList<ILuOptionItem<T>>, ILuOptionItem<T>[]>(q => q.toArray())
			.do(o => this._options = o);
	}
	@ContentChildren(ALuOptionItem, { descendants: true, read: ViewContainerRef }) optionsQLVR: QueryList<ViewContainerRef>;

	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._operators = ql.toArray();
	}
	protected _select(val: T) {
		this.onSelectValue.emit(val);
		this._emitCloseEvent();
	}
	ngOnDestroy() {
		super.destroy();
	}
	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}
	@ViewChild(TemplateRef)
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
	}
	getElementRef(value: T): ElementRef {
		// try to find the lo-option with the right value
		const options = this._options || [];
		const index = options.findIndex(oi => JSON.stringify(oi.value) === JSON.stringify(value));
		if (index >= 0) {
			const vcr = this.optionsQLVR.toArray()[index];
			return vcr.element;
		}
		return undefined;
	}
	getViewRef(value: T) { return undefined; }
}
