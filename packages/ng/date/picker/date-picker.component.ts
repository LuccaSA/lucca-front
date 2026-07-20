//FIXME

import { A11yModule } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, input, TemplateRef, viewChild } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ALuDateAdapter, ELuDateGranularity, LuDateGranularity, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { ALuPickerPanel } from '@lucca-front/ng/picker';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { LuCalendarInputComponent } from '../calendar';
import { LuDateInputDirective } from '../input';

@Component({
	selector: 'lu-date-picker',
	templateUrl: './date-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'LuDatePicker',
	animations: [luTransformPopover],
	imports: [FormsModule, LuCalendarInputComponent, LuDateInputDirective, A11yModule],
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuDatePickerComponent),
		},
	],
})
export class LuDatePickerComponent<D = Date> extends ALuPickerPanel<D> {
	_value: D;

	readonly min = input<D>();

	readonly max = input<D>();

	readonly granularity = input<LuDateGranularity>(ELuDateGranularity.day);

	readonly startOn = input<D>();

	override close = new EventEmitter<void>();
	override open = new EventEmitter<void>();
	override hovered = new EventEmitter<boolean>();
	override onSelectValue = new EventEmitter<D>();

	protected readonly closeOutput = outputFromObservable(this.close, { alias: 'close' });
	protected readonly openOutput = outputFromObservable(this.open, { alias: 'open' });
	protected readonly hoveredOutput = outputFromObservable(this.hovered, { alias: 'hovered' });
	protected readonly onSelectValueOutput = outputFromObservable(this.onSelectValue, { alias: 'onSelectValue' });

	private readonly vcTemplateRef = viewChild.required<TemplateRef<unknown>>(TemplateRef);

	constructor(private _adapter: ALuDateAdapter<D>) {
		super();

		ɵeffectWithDeps([this.vcTemplateRef], (vcTemplateRef) => {
			this.templateRef = vcTemplateRef;
		});
	}
	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}
	_emitHoveredEvent(h: boolean): void {
		this.hovered.emit(h);
	}
	_emitSelectValue(val: D) {
		this.onSelectValue.emit(val);
	}
	setValue(value: D) {
		this._value = value;
	}
	_onCalendar(val: D) {
		this._value = val;
		this._emitSelectValue(val);
		// if (!this.multiple) {
		this._emitCloseEvent();
		// }
	}
	_onInput(val: D) {
		this._value = val;
		this._emitSelectValue(val);
	}
	_onEnter() {
		this._emitCloseEvent();
	}
	override _handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				this._emitCloseEvent();
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'Tab':
				this._emitCloseEvent();
				break;
		}
	}
}
