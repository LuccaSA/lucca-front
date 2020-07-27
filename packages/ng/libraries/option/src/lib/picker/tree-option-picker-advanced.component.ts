import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	QueryList,
	forwardRef,
	ChangeDetectorRef,
	AfterViewInit,
} from '@angular/core';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { Observable, merge } from 'rxjs';
import { first, mapTo, startWith, shareReplay, delay, mergeAll } from 'rxjs/operators';
import { ALuPickerPanel } from '@lucca-front/ng/picker';
import {
	ALuTreeOptionOperator,
	ILuTreeOptionOperator,
} from '../operator/index';
import { ILuTreeOptionItem } from '../item/index';
import { ALuTreeOptionPickerComponent } from './tree-option-picker.component';
import { ILuTree } from '@lucca-front/ng/core';
import {
	ALuOnOpenSubscriber,
	ILuOnOpenSubscriber,
	ALuOnCloseSubscriber,
	ILuOnCloseSubscriber,
	ILuOnScrollBottomSubscriber,
	ALuOnScrollBottomSubscriber
} from '@lucca-front/ng/core';
import { ILuTreeOptionSelector, ALuTreeOptionSelector } from '../selector/index';

@Component({ template: '' })
export abstract class ALuTreeOptionPickerAdvancedComponent<T = any, O extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>>
extends ALuTreeOptionPickerComponent<T, O> implements AfterViewInit {
	loading$: Observable<boolean>;

	protected _operators: ILuTreeOptionOperator<T>[] = [];
	protected _operatorsQL: QueryList<ILuTreeOptionOperator<T>>;
	@ContentChildren(ALuTreeOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuTreeOptionOperator<T>>) {
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

	protected _selectorsQL: QueryList<ILuTreeOptionSelector<T>>;
	protected _selectors: ILuTreeOptionSelector<T>[] = [];
	@ContentChildren(ALuTreeOptionSelector, {descendants: true}) set selectorsQL(ql: QueryList<ILuTreeOptionSelector<T>>) {
		this._selectorsQL = ql;
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

	protected initOperators() {
		const operators = this._operatorsQL.toArray();
		this._operators = operators;
		let options$: Observable<ILuTree<T>[]>;
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
		}
	}
	protected initSelectors() {
		this._selectors = this._selectorsQL.toArray();
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
	selector: 'lu-tree-option-picker-advanced',
	templateUrl: './tree-option-picker-advanced.component.html',
	styleUrls: ['./tree-option-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuTreeOptionPickerAdvancedComponent),
		},
	]
})
export class LuTreeOptionPickerAdvancedComponent<T = any, O extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ALuTreeOptionPickerAdvancedComponent<T, O> {
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
	) {
		super(_changeDetectorRef);
	}
}
