import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewEncapsulation,
	ViewChildren,
	ContentChildren,
	AfterContentInit,
	AfterViewInit,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
} from '@angular/core';
import { LuPopoverComponent, luTransformPopover, LuPopoverTriggerEvent } from '../../popover/index';
import { ILuOption, LuOptionComponent } from '../../option';
import { ILuSelectPickerPanel } from './select-picker.model';
import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

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
export class LuSelectPickerComponent<T = any> extends LuPopoverComponent implements ILuSelectPickerPanel, OnDestroy {
	subs: Subscription;
	@Output() onSelect = new EventEmitter<T>();
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
		this.triggerEvent = 'click';
	}
	@ContentChildren(LuOptionComponent, { descendants: true}) options: QueryList<ILuOption<T>>;
	_emitOpenEvent() {
		this.subs = new Subscription();
		this.subToOptionSelected();
		super._emitOpenEvent();
	}
	_emitCloseEvent() {
		this.subs.unsubscribe();
		super._emitCloseEvent();
	}
	subToOptionSelected() {
		this.subs.add(
			// merge(this.options.toArray().map(o => o.onSelect))
			this.options.first.onSelect
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
	ngOnDestroy() {
		this.unSubToOptionSelected();
	}
}
