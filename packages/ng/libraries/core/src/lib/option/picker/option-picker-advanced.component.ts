import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	QueryList,
	forwardRef,
	Renderer2,
	ChangeDetectorRef,
} from '@angular/core';
import { luTransformPopover } from '../../overlay/index';
import { Observable } from 'rxjs';
import { first, mapTo, startWith, shareReplay } from 'rxjs/operators';
import { ALuPickerPanel } from '../../input/index';
import {
	ALuOptionOperator,
	ILuOptionOperator,
	ALuOnOpenSubscriber,
	ALuOnCloseSubscriber,
	ALuOnScrollBottomSubscriber,
} from '../operator/index';
import { LuOptionPickerComponent } from './option-picker.component';

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
export class LuOptionPickerAdvancedComponent<T = any>
extends LuOptionPickerComponent<T> {
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
		}
	}
	protected _onOpenSubscribers = [];
	@ContentChildren(ALuOnOpenSubscriber, { descendants: true }) set onOpenSubsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._onOpenSubscribers = ql.toArray();
	}
	protected _onCloseSubscribers = [];
	@ContentChildren(ALuOnCloseSubscriber, { descendants: true }) set onCloseSubsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._onCloseSubscribers = ql.toArray();
	}
	protected _onScrollBottomSubscribers = [];
	@ContentChildren(ALuOnScrollBottomSubscriber, { descendants: true }) set onScrollBottomSubsQL(ql: QueryList<ILuOptionOperator<T>>) {
		this._onScrollBottomSubscribers = ql.toArray();
	}

	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_renderer: Renderer2,
	) {
		super(_changeDetectorRef, _renderer);
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
}
