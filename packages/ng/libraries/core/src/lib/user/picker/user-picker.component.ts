import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewEncapsulation,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	ContentChildren,
} from '@angular/core';
import { luTransformPopover } from '../../popover/index';
import { ALuPickerPanel } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator, ILuOptionItem, ALuOptionItem, ALuOptionPicker } from '../../option/index';
import { ILuUserPickerPanel } from './user-picker.model';
import { IUser } from '../user.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-user-picker',
	templateUrl: './user-picker.component.html',
	styleUrls: ['./user-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuUserPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuUserPickerComponent),
		},
	]
})
export class LuUserPickerComponent<U extends IUser = IUser>
extends ALuOptionPicker<U>
implements ILuUserPickerPanel<U>, OnDestroy {
	@Output() onSelectValue = new EventEmitter<U>();
	@ContentChildren(ALuOptionItem) set optionsQL(ql: QueryList<ILuOptionItem<U>>) {
		this._optionItems$ =
		merge(Observable.of(ql), ql.changes)
		.map<QueryList<ILuOptionItem<U>>, ILuOptionItem<U>[]>(q => q.toArray());
	}
	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<U>>) {
		this._operators = ql.toArray();
	}
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
	}
	ngOnDestroy() {
		super.destroy();
	}
	protected _select(val: U) {
		this.onSelectValue.emit(val);
		super._emitCloseEvent();
	}
}
