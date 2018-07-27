import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewEncapsulation,
	ContentChildren,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	ViewChild,
} from '@angular/core';
import { luTransformPopover } from '../../popover/index';
import { ILuOptionItem, ALuOptionItem } from '../item/index';
import { ILuOptionPickerPanel, ALuOptionPicker } from './option-picker.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ALuPickerPanel } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator } from '../operator/index';
import { LuScrollDirective, ILuScrollable } from '../../scroll';

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
	]
})
export class LuOptionPickerComponent<T = any>
extends ALuOptionPicker<T>
implements ILuOptionPickerPanel<T>, OnDestroy {
	@Output() onSelectValue = new EventEmitter<T>();
	setValue(value: T) {}
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
		this.triggerEvent = 'click';
	}
	@ContentChildren(ALuOptionItem, { descendants: true }) set optionsQL(ql: QueryList<ILuOptionItem<T>>) {
		this._optionItems$ =
			merge(Observable.of(ql), ql.changes)
			.map<QueryList<ILuOptionItem<T>>, ILuOptionItem<T>[]>(q => q.toArray());
	}
	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._operators = ql.toArray();
	}
	protected _select(val: T) {
		this.onSelectValue.emit(val);
		super._emitCloseEvent();
	}
	ngOnDestroy() {
		super.destroy();
	}
}
