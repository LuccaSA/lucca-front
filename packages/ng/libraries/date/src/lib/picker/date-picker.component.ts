import { ALuPickerPanel } from '@lucca-front/ng/picker';
import { Component, ChangeDetectionStrategy, forwardRef, Output, EventEmitter, TemplateRef, ViewChild, ElementRef, AfterViewInit, ContentChild, Directive, AfterContentInit } from '@angular/core';
import { luTransformPopover } from '@lucca-front/ng/popover';
import { ESCAPE, TAB } from '@angular/cdk/keycodes';
import { LuDateInputDirective } from '../input/index';

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
export class LuDatePickerComponent extends ALuPickerPanel<Date> {
	_value: Date;

	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();
	@Output() hovered = new EventEmitter<boolean>();
	@Output() onSelectValue = new EventEmitter<Date>();

	// @ViewChild(LuDateInputDirective, { read: ElementRef, static: true }) set _vc(elt: ElementRef<HTMLInputElement>) {
	// 	debugger;
	// }
	// @ContentChild(LuDateInputDirective, { read: ElementRef, static: true }) set _cc(elt: ElementRef<HTMLInputElement>) {
	// 	debugger;
	// }

	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
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
	_emitSelectValue(val: Date) {
		this.onSelectValue.emit(val);
	}
	setValue(value: Date) {
		this._value = value;
	}
	_onCalendar(val: Date) {
		this._value = val;
		this._emitSelectValue(val);
		// if (!this.multiple) {
			this._emitCloseEvent();
		// }
	}
	_onInput(val: Date) {
		this._value = val;
		this._emitSelectValue(val);
	}
	_onEnter() {
		this._emitCloseEvent();
	}
	_handleKeydown(event: KeyboardEvent) {
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
