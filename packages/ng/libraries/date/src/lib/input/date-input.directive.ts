import { Directive, ElementRef, Renderer2, ChangeDetectorRef, forwardRef, HostListener, Input, Inject } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms';
import { ALuDateAdapter, ELuDateGranularity } from '@lucca-front/ng/core';
import { ILuDateInputLabel } from './date-input.translate';
import { LuDateInputIntl } from './date-input.intl';

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
	@Input() min?: D;
	@Input() max?: D;
	@Input() granularity: ELuDateGranularity = ELuDateGranularity.day;

	@Input() set placeholder(p: string) {
		this._elementRef.nativeElement.placeholder = p;
	}
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef<HTMLInputElement>,
		_renderer: Renderer2,
		private _adapter: ALuDateAdapter<D>,
		@Inject(LuDateInputIntl) private _intl: ILuDateInputLabel,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
		this.placeholder = this._intl.placeholder;
	}
	protected render() {
		if (this._focused) { return; }
		const text = this.value && this._adapter.isValid(this.value) ? this._adapter.format(this.value, 'shortDate') : '';
		this._elementRef.nativeElement.value = text;
	}
	@HostListener('input', ['$event'])
	onInput(event) {
		const text = event.target.value as string;
		const value = this.parse(text);
		this.setValue(value);
	}
	private parse(text): D {
		const date = this._adapter.parse(text, this.granularity);
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
		if (!!this.min && this._adapter.isValid(this.min) && this._adapter.compare(this.min, d, ELuDateGranularity.day) > 0) {
			return { 'min': true };
		}
		if (!!this.max && this._adapter.isValid(this.max) && this._adapter.compare(this.max, d, ELuDateGranularity.day) < 0) {
			return { 'max': true };
		}
		return null;
	}
}

