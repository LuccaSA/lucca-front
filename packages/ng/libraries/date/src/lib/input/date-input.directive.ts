import { Directive, ElementRef, Renderer2, ChangeDetectorRef, Inject, LOCALE_ID, forwardRef, HostListener } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms';
import { ALuDateAdapter } from '../adapter/index';

@Directive({
	selector: 'input[luDateInput]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateInputDirective),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: LuDateInputDirective,
			multi: true,
		},
	],
})
export class LuDateInputDirective<D> extends ALuInput<D> implements Validator {
	private _focused = false;
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef<HTMLInputElement>,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
		private _adapter: ALuDateAdapter<D>,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	protected render() {
		if (this._focused) { return; }
		const text = this.value ? this._adapter.format(this.value, 'shortDate') : '';
		this._elementRef.nativeElement.value = text;
	}
	@HostListener('input', ['$event'])
	onInput(event) {
		const text = event.target.value as string;
		const value = this.parse(text);
		this.setValue(value);
	}
	private parse(text): D {
		const date = this._adapter.parse(text);
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
	validate(control: AbstractControl): ValidationErrors | null {
		const d = control.value;
		if (!d) { return null; }
		if (!this._adapter.isValid(d)) { return { 'date': true }; }
		return null;
	}
}

