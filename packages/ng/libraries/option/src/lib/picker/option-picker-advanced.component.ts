import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	QueryList,
	forwardRef,
	ChangeDetectorRef,
} from '@angular/core';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { Observable, merge } from 'rxjs';
import { first, mapTo, startWith, shareReplay, delay, mergeAll } from 'rxjs/operators';

import { ALuPickerPanel } from '@lucca-front/ng/picker';
import {
	ALuOptionOperator,
	ILuOptionOperator,
	ALuOnOpenSubscriber,
	ALuOnCloseSubscriber,
	ALuOnScrollBottomSubscriber,
	ILuOnOpenSubscriber,
	ILuOnCloseSubscriber,
	ILuOnScrollBottomSubscriber,
} from '../operator/index';
import { ALuOptionPickerComponent } from './option-picker.component';
import { ILuOptionItem } from '../item/index';
import { ALuOptionSelector, ILuOptionSelector } from '../selector/index';

export abstract class ALuOptionPickerAdvancedComponent<T = any, O extends ILuOptionItem<T> = ILuOptionItem<T>>
extends ALuOptionPickerComponent<T, O> {
	loading$: Observable<boolean>;

	protected _operators = [];
	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		const operators = ql.toArray();
		this._operators = operators;
		let options$: Observable<T[]>;
		operators.forEach(operator => {
			operator.inOptions$ = options$;
			options$ = operator.outOptions$;
		});
		const lastOperator = operators[operators.length - 1];
		if (lastOperator && lastOperator.outOptions$) {
			this.loading$ = lastOperator.outOptions$.pipe(
				first(),
				mapTo(false),
				startWith(true),
				shareReplay(),
			);
			this.loading$.pipe(
				delay(1),
			).subscribe(l => {
				if (!l) {
					// replay onOpen when loading is done
					this.onOpen();
				}
			});
		}
	}
	protected _onOpenSubscribers = [];
	@ContentChildren(ALuOnOpenSubscriber, { descendants: true }) set onOpenSubsQL(ql: QueryList<ILuOnOpenSubscriber>) {
		this._onOpenSubscribers = ql.toArray();
	}
	protected _onCloseSubscribers = [];
	@ContentChildren(ALuOnCloseSubscriber, { descendants: true }) set onCloseSubsQL(ql: QueryList<ILuOnCloseSubscriber>) {
		this._onCloseSubscribers = ql.toArray();
	}
	protected _onScrollBottomSubscribers = [];
	@ContentChildren(ALuOnScrollBottomSubscriber, { descendants: true }) set onScrollBottomSubsQL(ql: QueryList<ILuOnScrollBottomSubscriber>) {
		this._onScrollBottomSubscribers = ql.toArray();
	}
	protected _selectors: ILuOptionSelector<T>[] = [];
	@ContentChildren(ALuOptionSelector, {descendants: true}) set selectorsQL(ql: QueryList<ILuOptionSelector<T>>) {
		this._selectors = ql.toArray();
		this._subs.add(
			merge(
				this._selectors.map(s => s.onSelectValue),
			).pipe(
				mergeAll(),
			).subscribe(values => {
				this._select(values);
			})
		);
	}

	constructor(
		_changeDetectorRef: ChangeDetectorRef,
	) {
		super(_changeDetectorRef);
	}
	onScrollBottom() {
		this._onScrollBottomSubscribers.forEach(o => {
			if (!o.onScrollBottom) { return; }
			o.onScrollBottom();
		});
	}
	onOpen() {
		this._onOpenSubscribers.forEach(o => {
			o.onOpen();
		});
		super.onOpen();
	}
	onClose() {
		this._onCloseSubscribers.forEach(o => {
			o.onClose();
		});
		super.onClose();
	}
	setValue(value: T | T[]) {
		super.setValue(value);
		this._selectors.forEach(s => s.setValue(value));
	}
}

/**
* advanced option picker panel
*/
@Component({
	selector: 'lu-option-picker-advanced',
	templateUrl: './option-picker-advanced.component.html',
	styleUrls: ['./option-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuOptionPickerAdvancedComponent),
		},
	]
})
export class LuOptionPickerAdvancedComponent<T = any, O extends ILuOptionItem<T> = ILuOptionItem<T>> extends ALuOptionPickerAdvancedComponent<T, O> {
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
	) {
		super(_changeDetectorRef);
	}
}
