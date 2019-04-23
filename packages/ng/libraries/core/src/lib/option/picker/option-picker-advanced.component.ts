import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	Renderer2,
	ChangeDetectorRef,
	AfterViewInit,
	Input,
} from '@angular/core';
import { luTransformPopover } from '../../overlay/index';
import { ILuOptionItem, ALuOptionItem } from '../item/index';
import { ILuOptionPickerPanel, ALuOptionPicker } from './option-picker.model';
import { merge, of, Observable } from 'rxjs';
import { map, delay, first, mapTo, startWith, shareReplay } from 'rxjs/operators';
import { ALuPickerPanel } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator } from '../operator/index';
import { LuOptionPickerComponent } from './option-picker.component';

/**
* basic option picker panel
*/
@Component({
	selector: 'lu-option-picker-advanced',
	templateUrl: './option-picker.component.html',
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
extends LuOptionPickerComponent {
	protected _operators;

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
				shareReplay()
			);
		}
	}
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_renderer: Renderer2,
	) {
		super(_changeDetectorRef, _renderer);
	}
	onScrollBottom() {
		if (!this._operators) { return; }
		this._operators.forEach(o => {
			if (!o.onScrollBottom) { return; }
			o.onScrollBottom();
		});
	}
	onOpen() {
		this._operators.forEach(o => {
			if (!o.onOpen) { return; }
			o.onOpen();
		});
		super.onOpen();
	}
	onClose() {
		this._operators.forEach(o => {
			if (!o.onClose) { return; }
			o.onClose();
		});
		super.onClose();
	}
}
