import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, forwardRef, Inject, QueryList } from '@angular/core';
import { ALuOnCloseSubscriber, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuPickerPanel } from '@lucca-front/ng/picker';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { merge, Observable } from 'rxjs';
import { first, map, mergeAll, shareReplay, startWith } from 'rxjs/operators';
import { ALuOptionOperator, ILuOptionOperator } from '../operator/index';
import { ALuOptionSelector, ILuOptionSelector } from '../selector/index';
import { ALuOptionPickerComponent } from './option-picker.component';

@Directive()
export abstract class ALuOptionPickerAdvancedComponent<T, O extends import('../item/option-item.model').ILuOptionItem<T> = import('../item/option-item.model').ILuOptionItem<T>>
	extends ALuOptionPickerComponent<T, O>
	implements AfterViewInit
{
	loading$: Observable<boolean>;

	protected _operators: ILuOptionOperator<T>[] = [];
	protected _operatorsQL: QueryList<ILuOptionOperator<T>>;
	@ContentChildren(ALuOptionOperator, { descendants: true }) set operatorsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._operatorsQL = ql;
	}
	protected _onOpenSubscribers: ILuOnOpenSubscriber[] = [];
	@ContentChildren(ALuOnOpenSubscriber, { descendants: true }) set onOpenSubsQL(ql: QueryList<ILuOnOpenSubscriber>) {
		this._onOpenSubscribers = ql.toArray();
	}
	protected _onCloseSubscribers: ILuOnCloseSubscriber[] = [];
	@ContentChildren(ALuOnCloseSubscriber, { descendants: true })
	set onCloseSubsQL(ql: QueryList<ILuOnCloseSubscriber>) {
		this._onCloseSubscribers = ql.toArray();
	}
	protected _onScrollBottomSubscribers: ILuOnScrollBottomSubscriber[] = [];
	@ContentChildren(ALuOnScrollBottomSubscriber, { descendants: true })
	set onScrollBottomSubsQL(ql: QueryList<ILuOnScrollBottomSubscriber>) {
		this._onScrollBottomSubscribers = ql.toArray();
	}
	protected _selectors: ILuOptionSelector<T>[] = [];
	protected _selectorsQL: QueryList<ILuOptionSelector<T>>;
	@ContentChildren(ALuOptionSelector, { descendants: true }) set selectorsQL(ql: QueryList<ILuOptionSelector<T>>) {
		this._selectorsQL = ql;
	}

	constructor(_changeDetectorRef: ChangeDetectorRef, @Inject(DOCUMENT) document: Document) {
		super(_changeDetectorRef, document);
	}
	onScrollBottom() {
		this._onScrollBottomSubscribers.forEach((o: ILuOnScrollBottomSubscriber) => {
			if (!o.onScrollBottom) {
				return;
			}
			o.onScrollBottom();
		});
	}
	override onOpen() {
		this._onOpenSubscribers.forEach((o: ILuOnOpenSubscriber) => {
			o.onOpen();
		});
		const operators = this._operators || [];
		const lastOperator = operators[operators.length - 1];
		if (lastOperator && lastOperator.outOptions$) {
			this.loading$ = lastOperator.outOptions$.pipe(
				first(),
				map(() => false),
				startWith(true),
				shareReplay(),
			);
		}
		super.onOpen();
	}
	override onClose() {
		this._onCloseSubscribers.forEach((o: ILuOnCloseSubscriber) => {
			o.onClose();
		});
		super.onClose();
	}
	override setValue(value: T | T[]) {
		super.setValue(value);
		this._selectors.forEach((s) => s.setValue(value));
	}
	protected initOperators() {
		const operators = this._operatorsQL.toArray();
		this._operators = operators;
		let options$: Observable<T[]>;
		operators.forEach((operator) => {
			operator.inOptions$ = options$;
			options$ = operator.outOptions$;
		});
	}
	protected initSelectors() {
		// TODO : FIX changes type
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const selectors$: Observable<ILuOptionSelector<T>[]> = this._selectorsQL.changes.pipe(startWith(this._selectorsQL.toArray()));
		this._subs.add(
			selectors$.subscribe((selectors) => {
				this._selectors = selectors;
				this._subs.add(
					merge(this._selectors.map((s) => s.onSelectValue))
						.pipe(mergeAll())
						.subscribe((values) => {
							this._select(values);
						}),
				);
			}),
		);
	}
	override ngAfterViewInit() {
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
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuOptionPickerAdvanced',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuOptionPickerAdvancedComponent),
		},
	],
})
export class LuOptionPickerAdvancedComponent<
	T,
	O extends import('../item/option-item.model').ILuOptionItem<T> = import('../item/option-item.model').ILuOptionItem<T>,
> extends ALuOptionPickerAdvancedComponent<T, O> {
	constructor(_changeDetectorRef: ChangeDetectorRef, @Inject(DOCUMENT) document: Document) {
		super(_changeDetectorRef, document);
	}
}
