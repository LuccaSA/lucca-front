import { ALuPickerPanel } from '@lucca-front/ng/picker';
import { Component, ChangeDetectionStrategy, forwardRef, Output, EventEmitter, TemplateRef, ViewChild, Input } from '@angular/core';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { ESCAPE, TAB } from '@angular/cdk/keycodes';
import { ALuDateAdapter, ELuDateGranularity } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-date-picker',
	templateUrl: './date-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'LuDatePicker',
	animations: [luTransformPopover],
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuDatePickerComponent),
		},
	]
})

export class LuDatePickerComponent<D = Date> extends ALuPickerPanel<D> {
	_value: D;

	@Input() min?: D;
	@Input() max?: D;
	@Input() granularity: ELuDateGranularity = ELuDateGranularity.day;
	@Input() startOn: D = this._adapter.forgeToday();

	@Output() override close = new EventEmitter<void>();
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();
	@Output() override onSelectValue = new EventEmitter<D>();

	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
	}
	
	constructor(
		private _adapter: ALuDateAdapter<D>,
	) {
		super();
	}
	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}
	_emitHoveredEvent(h): void {
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
		switch (event.keyCode) {
			case ESCAPE:
				this._emitCloseEvent();
				event.preventDefault();
				event.stopPropagation();
				break;
			case TAB:
				this._emitCloseEvent();
				break;
		}
	}
	// ngAfterViewInit() {
	// 	this._dateInput.nativeElement.focus();
	// }
}
