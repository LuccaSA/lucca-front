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
	forwardRef,
	AfterViewInit,
} from '@angular/core';
import { LuPopoverPanelComponent, luTransformPopover } from '../../popover/index';
import { ILuOptionItem, ALuOptionItem } from '../item/index';
import { ILuOptionPickerPanel } from './option-picker.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ALuPickerPanel } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator } from '../operator/index';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
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
extends LuPopoverPanelComponent
implements ILuOptionPickerPanel<T>, OnDestroy, AfterContentInit {
	subs: Subscription;
	@Output() onSelectValue = new EventEmitter<T>();
	setValue(value: T) {}
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
		this.triggerEvent = 'click';
	}
	@ContentChildren(ALuOptionItem, { descendants: true }) optionsQL: QueryList<ILuOptionItem<T>>;
	@ContentChildren(ALuOptionOperator, { descendants: true }) operatorsQL: QueryList<ILuOptionOperator<T>>;

	subToOptionSelected() {
		const allOptionsOnSelect$ =
		merge(Observable.of(this.optionsQL), this.optionsQL.changes)
			.map<QueryList<ILuOptionItem<T>>, Observable<T>>(ql => {
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
		this.onSelectValue.emit(val);
		this._emitCloseEvent();
	}
	ngAfterContentInit() {
		this.subs = new Subscription();
		this.subToOptionSelected();
		this.initOperators();
	}
	ngOnDestroy() {
		this.unSubToOptionSelected();
	}

	initOperators() {
		const operators: ILuOptionOperator<T>[] = this.operatorsQL.toArray();
		let options$: Observable<T[]>;
		operators.forEach(operator => {
			operator.inOptions$ = options$;
			options$ = operator.outOptions$;
		});
	}

}
