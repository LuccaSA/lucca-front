import { Directive, ElementRef, Renderer2, ChangeDetectorRef, Inject, LOCALE_ID, forwardRef, HostListener } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { formatDate } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef<HTMLInputElement>,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	protected render() {
		const text = this.value ? formatDate(this.value, 'shortDate', this._locale) : undefined;
		this._elementRef.nativeElement.value = text;
	}
	@HostListener('input', ['$event'])
	onInput(event) {
		const text = event.target.value as string;
		const value = this.parse(text);
		this.setValue(value);
	}
	parse(text): Date {
		const date = new Date();
		date.setDate(Math.ceil(Math.random() * 30));
		return date;
	}
}
