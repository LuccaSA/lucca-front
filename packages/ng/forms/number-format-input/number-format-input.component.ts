import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, LOCALE_ID, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions, luBooleanAttribute, luOptionalNumberAttribute } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { NumberFormat, NumberFormatCurrencyDisplay, NumberFormatDirective, NumberFormatOptions, NumberFormatStyle, NumberFormatUnit, NumberFormatUnitDisplay } from '@lucca-front/ng/number-format';
import { startWith } from 'rxjs/operators';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFORMATFIELD_TRANSLATIONS } from './number-format-input.translate';

@Component({
	selector: 'lu-number-format-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NumberFormatDirective, NgTemplateOutlet, ClearComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './number-format-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFormatInputComponent implements AfterViewInit {
	#locale = inject(LOCALE_ID);
	#destroyRef = inject(DestroyRef);

	ngControl = injectNgControl();

	ngAfterViewInit(): void {
		this.ngControl?.valueChanges?.pipe(takeUntilDestroyed(this.#destroyRef), startWith(this.ngControl.value)).subscribe((value) => this.#suffixPrefixValue.set(value as number));
	}

	/**
	 * Formatting style of the number (`Intl.NumberFormat` style), defaults to 'decimal'
	 */
	readonly formatStyle = input<NumberFormatStyle>('decimal');

	/**
	 * Computes the prefix and suffix from the number format (e.g. currency symbol, unit) instead of using `prefix` and `suffix`
	 */
	readonly useAutoPrefixSuffix = input(false, { transform: luBooleanAttribute });

	/**
	 * Content or icon displayed before the input, ignored when `useAutoPrefixSuffix` is true
	 */
	readonly prefix = input<TextInputAddon | undefined>(undefined);

	/**
	 * Content or icon displayed after the input, ignored when `useAutoPrefixSuffix` is true
	 */
	readonly suffix = input<TextInputAddon | undefined>(undefined);

	/**
	 * ISO 4217 currency code (e.g. 'EUR'), used when `formatStyle` is 'currency'
	 */
	readonly currency = input<string | undefined>(undefined);

	/**
	 * How the currency is displayed, used when `formatStyle` is 'currency'
	 */
	readonly currencyDisplay = input<NumberFormatCurrencyDisplay | undefined>(undefined);

	/**
	 * Unit of the value, used when `formatStyle` is 'unit'
	 */
	readonly unit = input<NumberFormatUnit | undefined>(undefined);

	/**
	 * How the unit is displayed, used when `formatStyle` is 'unit'
	 */
	readonly unitDisplay = input<NumberFormatUnitDisplay | undefined>(undefined);

	/**
	 * Minimum value, the entered value is clamped to it
	 */
	readonly min = input(undefined, { transform: luOptionalNumberAttribute });

	/**
	 * Maximum value, the entered value is clamped to it
	 */
	readonly max = input(undefined, { transform: luOptionalNumberAttribute });

	/**
	 * Placeholder of the input
	 */
	readonly placeholder = input<string>('');

	/**
	 * Displays a button to clear the value when the input is not empty
	 */
	readonly hasClearer = input(false, { transform: luBooleanAttribute });

	/**
	 * Aligns the value to the right
	 */
	readonly valueAlignRight = input(false, { transform: luBooleanAttribute });

	readonly inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	readonly #suffixPrefixValue = signal(1);

	readonly #numberFormat = computed(() => new NumberFormat(this.formatOptions()));
	readonly prefixAddon = computed(() => {
		if (this.useAutoPrefixSuffix() === false) {
			return this.prefix();
		}
		const content = this.#numberFormat().getPrefix(this.#suffixPrefixValue());
		if (content == null || content.trim() === '') {
			return undefined;
		}
		return {
			content,
			ariaLabel: content,
		};
	});
	readonly suffixAddon = computed(() => {
		if (this.useAutoPrefixSuffix() === false) {
			return this.suffix();
		}
		const content = this.#numberFormat().getSuffix(this.#suffixPrefixValue());
		if (content == null || content.trim() === '') {
			return undefined;
		}
		return {
			content,
			ariaLabel: content,
		};
	});

	readonly formatOptions = computed(
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

	readonly formattedValue = computed(() => this.#numberFormat().getBlurFormat(this.#suffixPrefixValue()));

	/**
	 * Overrides the default translations (partial overrides are merged with the defaults)
	 */
	readonly intl = input(...intlInputOptions(LU_NUMBERFORMATFIELD_TRANSLATIONS));

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef()?.nativeElement.focus();
	}
}
