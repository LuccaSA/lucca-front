import { Directive, ElementRef, Renderer2, ChangeDetectorRef, Inject, LOCALE_ID, forwardRef, HostListener } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { formatDate } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LuDateAdapter } from './date.adapter';

@Directive({
	selector: 'input[luDateInput]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateInputDirective),
			multi: true,
		},
	],
})
export class LuDateInputDirective extends ALuInput<Date> {
	private _focused = false;
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef<HTMLInputElement>,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
		private _adapter: LuDateAdapter,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	protected render() {
		if (!this._focused) {
			const text = this.value ? formatDate(this.value, 'shortDate', this._locale) : undefined;
			this._elementRef.nativeElement.value = text;
		}
	}
	@HostListener('input', ['$event'])
	onInput(event) {
		const text = event.target.value as string;
		const value = this.parse(text);
		this.setValue(value);
	}
	private parse(text): Date {
		const date = this._adapter.parseText(text);
		return date;
	}
	@HostListener('focus')
	onFocus() {
		this._focused = true;
	}
	@HostListener('blur')
	onBlur() {
		this._focused = false;
		this.render();
	}
}
