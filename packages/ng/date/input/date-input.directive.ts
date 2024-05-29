import { ChangeDetectorRef, Directive, ElementRef, forwardRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ALuDateAdapter, ELuDateGranularity, getIntl } from '@lucca-front/ng/core';
import { ALuInput } from '@lucca-front/ng/input';
import { LU_DATE_INPUT_TRANSLATIONS } from './date-input.translate';

@Directive({
	selector: 'input[luDateInput]',
	standalone: true,
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
export class LuDateInputDirective<D> extends ALuInput<D, HTMLInputElement> implements Validator, OnInit {
	private _focused = false;
	@Input() min?: D;
	@Input() max?: D;
	@Input() granularity: ELuDateGranularity = ELuDateGranularity.day;

	@Input() override set placeholder(p: string) {
		this._elementRef.nativeElement.placeholder = p;
	}
	private _intl = getIntl(LU_DATE_INPUT_TRANSLATIONS);
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef<HTMLInputElement>,
		_renderer: Renderer2,
		private _adapter: ALuDateAdapter<D>,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	ngOnInit() {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				this.placeholder = this._intl.placeholderYear;
				break;
			case ELuDateGranularity.month:
				this.placeholder = this._intl.placeholderMonth;
				break;
			case ELuDateGranularity.day:
			default:
				this.placeholder = this._intl.placeholderDay;
				break;
		}
	}
	protected render() {
		if (this._focused) {
			return;
		}
		let format: string;
		switch (this.granularity) {
			case ELuDateGranularity.year:
				format = this._intl.formatYear;
				break;
			case ELuDateGranularity.month:
				format = this._intl.formatMonth;
				break;
			case ELuDateGranularity.day:
			default:
				format = this._intl.formatDay;
				break;
		}
		const text = this.value && this._adapter.isValid(this.value) ? this._adapter.format(this.value, format) : '';
		this._elementRef.nativeElement.value = text;
	}
	@HostListener('input', ['$event'])
	onInput(event) {
		// FIXME
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const text = event.target.value as string;
		const value = this.parse(text);
		this.setValue(value);
	}
	private parse(text: string): D {
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
		const d = control.value as D;
		if (!d) {
			return null;
		}
		if (!this._adapter.isValid(d)) {
			return { date: true };
		}
		if (!!this.min && this._adapter.isValid(this.min) && this._adapter.compare(this.min, d, ELuDateGranularity.day) > 0) {
			return { min: true };
		}
		if (!!this.max && this._adapter.isValid(this.max) && this._adapter.compare(this.max, d, ELuDateGranularity.day) < 0) {
			return { max: true };
		}
		return null;
	}
}
