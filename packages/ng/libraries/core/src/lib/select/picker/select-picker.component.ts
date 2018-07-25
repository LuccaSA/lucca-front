import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewEncapsulation,
	ContentChildren,
	AfterContentInit,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
} from '@angular/core';
import { LuPopoverPanelComponent, luTransformPopover } from '../../popover/index';
import { ILuOption, LuOptionComponent } from '../../option/index';
import { ILuSelectPickerPanel } from './select-picker.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-select-picker',
	templateUrl: './select-picker.component.html',
	styleUrls: ['./select-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuSelectPicker',
})
export class LuSelectPickerComponent<T = any> extends LuPopoverPanelComponent implements ILuSelectPickerPanel, OnDestroy, AfterContentInit {
	subs: Subscription;
	@Output() onSelect = new EventEmitter<T>();
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
		this.triggerEvent = 'click';
	}
	@ContentChildren(LuOptionComponent, { descendants: true }) optionsQL: QueryList<ILuOption<T>>;

	subToOptionSelected() {
		this.subs = new Subscription();
		const allOptionsOnSelect$ =
		merge(Observable.of(this.optionsQL), this.optionsQL.changes)
			.map<QueryList<ILuOption<T>>, Observable<T>>(ql => {
				return merge(...ql.toArray().map(o => o.onSelect));
			})
			.mergeMap(o => o);
		this.subs.add(
			allOptionsOnSelect$
			.subscribe((val: T) => this._select(val))
		);
	}
	unSubToOptionSelected() {
		this.subs.unsubscribe();
	}
	_select(val: T) {
		this.onSelect.emit(val);
		this._emitCloseEvent();
	}
	ngAfterContentInit() {
		this.subToOptionSelected();
	}
	ngOnDestroy() {
		this.unSubToOptionSelected();
	}
	
}
