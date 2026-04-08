import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ALuDateAdapter, ELuDateGranularity, intlInputOptions, isNotNil, LuDateGranularity } from '@lucca-front/ng/core';
import { ALuInput } from '@lucca-front/ng/input';
import { LU_DATE_INPUT_TRANSLATIONS } from './date-input.translate';

@Directive({
	selector: 'input[luDateInput]',
	host: {
		'(input)': 'onInput($event)',
		'(focus)': 'onFocus()',
		'(blur)': 'onBlur()',
	},
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

	readonly min = input<D>();

	readonly max = input<D>();

	readonly granularity = input<LuDateGranularity>(ELuDateGranularity.day);

	@Input() override set placeholder(p: string) {
		this._elementRef.nativeElement.placeholder = p;
	}

	public readonly intl = input(...intlInputOptions(LU_DATE_INPUT_TRANSLATIONS));
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef<HTMLInputElement>,
		_renderer: Renderer2,
		private _adapter: ALuDateAdapter<D>,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	ngOnInit() {
		switch (this.granularity()) {
			case ELuDateGranularity.year:
				this._elementRef.nativeElement.placeholder = this.intl().placeholderYear;
				break;
			case ELuDateGranularity.month:
				this._elementRef.nativeElement.placeholder = this.intl().placeholderMonth;
				break;
			case ELuDateGranularity.day:
			default:
				this._elementRef.nativeElement.placeholder = this.intl().placeholderDay;
				break;
		}
	}
	protected render() {
		if (this._focused) {
			return;
		}
		let format: string;
		switch (this.granularity()) {
			case ELuDateGranularity.year:
				format = 'y';
				break;
			case ELuDateGranularity.month:
				format = 'MM/y';
				break;
			case ELuDateGranularity.day:
			default:
				format = 'shortDate';
				break;
		}
		const text = this.value && this._adapter.isValid(this.value) ? this._adapter.format(this.value, format) : '';
		this._elementRef.nativeElement.value = text;
	}

	onInput(event) {
		// FIXME
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const text = event.target.value as string;
		const value = this.parse(text);
		if (isNotNil(value)) {
			this.setValue(value);
		}
	}

	private parse(text: string): D | undefined {
		return this._adapter.parse(text, this.granularity());
	}

	onFocus() {
		this._focused = true;
	}

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
		const min = this.min();
		if (!!min && this._adapter.isValid(min) && this._adapter.compare(min, d, ELuDateGranularity.day) > 0) {
			return { min: true };
		}
		const max = this.max();
		if (!!max && this._adapter.isValid(max) && this._adapter.compare(max, d, ELuDateGranularity.day) < 0) {
			return { max: true };
		}
		return null;
	}
}
