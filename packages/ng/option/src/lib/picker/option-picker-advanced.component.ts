import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	QueryList,
	forwardRef,
	ChangeDetectorRef,
	AfterViewInit,
	Directive,
	Inject,
} from '@angular/core';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { Observable, merge } from 'rxjs';
import { first, mapTo, startWith, shareReplay, delay, mergeAll } from 'rxjs/operators';

import { ALuPickerPanel } from '@lucca-front/ng/picker';
import {
	ALuOptionOperator,
	ILuOptionOperator,
} from '../operator/index';
import {
	ALuOnOpenSubscriber,
	ALuOnCloseSubscriber,
	ALuOnScrollBottomSubscriber,
	ILuOnOpenSubscriber,
	ILuOnCloseSubscriber,
	ILuOnScrollBottomSubscriber,
} from '@lucca-front/ng/core';
import { ALuOptionPickerComponent } from './option-picker.component';
import { ILuOptionItem } from '../item/index';
import { ALuOptionSelector, ILuOptionSelector } from '../selector/index';
import { DOCUMENT } from '@angular/common';

@Directive()
export abstract class ALuOptionPickerAdvancedComponent<T = any, O extends ILuOptionItem<T> = ILuOptionItem<T>>
extends ALuOptionPickerComponent<T, O> implements AfterViewInit {
	loading$: Observable<boolean>;

	protected _operators = [];
	protected _operatorsQL: QueryList<ILuOptionOperator<T>>;
	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._operatorsQL = ql;
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
	protected _selectorsQL: QueryList<ILuOptionSelector<T>>;
	@ContentChildren(ALuOptionSelector, {descendants: true}) set selectorsQL(ql: QueryList<ILuOptionSelector<T>>) {
		this._selectorsQL = ql;
	}

	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		@Inject(DOCUMENT) document: Document,
	) {
		super(_changeDetectorRef, document);
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
		const operators = this._operators || [];
		const lastOperator = operators[operators.length - 1];
		if (lastOperator && lastOperator.outOptions$) {
			this.loading$ = lastOperator.outOptions$.pipe(
				first(),
				mapTo(false),
				startWith(true),
				shareReplay(),
			);
		}
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
	protected initOperators() {
		const operators = this._operatorsQL.toArray();
		this._operators = operators;
		let options$: Observable<T[]>;
		operators.forEach(operator => {
			operator.inOptions$ = options$;
			options$ = operator.outOptions$;
		});
	}
	protected initSelectors() {
		const selectors$: Observable<ILuOptionSelector<T>[]> = this._selectorsQL.changes.pipe(
			startWith(this._selectorsQL.toArray()),
		);
		this._subs.add(
			selectors$.subscribe(selectors => {
				this._selectors = selectors;
				this._subs.add(
					merge(
						this._selectors.map(s => s.onSelectValue),
					).pipe(
						mergeAll(),
					).subscribe(values => {
						this._select(values);
					})
				);
			}),
		);
	}
	ngAfterViewInit() {
		super.ngAfterViewInit();
		this.initOperators();
		this.initSelectors();
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
		@Inject(DOCUMENT) document: Document,
	) {
		super(_changeDetectorRef, document);
	}
}
