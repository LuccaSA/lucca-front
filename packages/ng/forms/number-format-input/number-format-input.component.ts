import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, computed, DestroyRef, ElementRef, inject, input, LOCALE_ID, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { NumberFormat, NumberFormatCurrencyDisplay, NumberFormatDirective, NumberFormatOptions, NumberFormatStyle, NumberFormatUnit, NumberFormatUnitDisplay } from '@lucca-front/ng/number-format';
import { startWith } from 'rxjs/operators';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFORMATFIELD_TRANSLATIONS } from './number-format-input.translate';

@Component({
	selector: 'lu-number-format-input',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, ReactiveFormsModule, FormFieldIdDirective, NumberFormatDirective, NgTemplateOutlet, ClearComponent],
	templateUrl: './number-format-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class NumberFormatInputComponent implements AfterViewInit {
	#locale = inject(LOCALE_ID);
	#destroyRef = inject(DestroyRef);

	ngControl = injectNgControl();

	ngAfterViewInit(): void {
		this.ngControl?.valueChanges?.pipe(takeUntilDestroyed(this.#destroyRef), startWith(this.ngControl.value)).subscribe((value) => this.#suffixPrefixValue.set(value as number));
	}

	formatStyle = input<NumberFormatStyle>('decimal');

	useAutoPrefixSuffix = input<boolean | undefined>(undefined);

	prefix = input<TextInputAddon | undefined>(undefined);

	suffix = input<TextInputAddon | undefined>(undefined);

	currency = input<string | undefined>(undefined);

	currencyDisplay = input<NumberFormatCurrencyDisplay | undefined>(undefined);

	unit = input<NumberFormatUnit | undefined>(undefined);

	unitDisplay = input<NumberFormatUnitDisplay | undefined>(undefined);

	min = input<number | undefined>(undefined);

	max = input<number | undefined>(undefined);

	placeholder = input<string>('');

	hasClearer = input(false, { transform: booleanAttribute });

	valueAlignRight = input(false, { transform: booleanAttribute });

	inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	#suffixPrefixValue = signal(1);

	#numberFormat = computed(() => new NumberFormat(this.formatOptions()));
	prefixAddon = computed(() => {
		if (this.useAutoPrefixSuffix() === undefined || this.useAutoPrefixSuffix() === false) {
			return this.prefix();
		}
		const content = this.#numberFormat().getPrefix(this.#suffixPrefixValue());
		if (content == null || content.trim() === '') {
			return undefined;
		}
		return {
			content,
			ariaLabel: content,
		} as TextInputAddon;
	});
	suffixAddon = computed(() => {
		if (this.useAutoPrefixSuffix() === undefined || this.useAutoPrefixSuffix() === false) {
			return this.suffix();
		}
		const content = this.#numberFormat().getSuffix(this.#suffixPrefixValue());
		if (content == null || content.trim() === '') {
			return undefined;
		}
		return {
			content,
			ariaLabel: content,
		} as TextInputAddon;
	});

	formatOptions = computed(
		() =>
			({
				locale: this.#locale,
				style: this.formatStyle(),
				min: this.min(),
				max: this.max(),
				currency: this.currency(),
				currencyDisplay: this.currencyDisplay(),
				unit: this.unit(),
				unitDisplay: this.unitDisplay(),
			}) satisfies NumberFormatOptions,
	);

	intl = getIntl(LU_NUMBERFORMATFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
