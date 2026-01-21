import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, LOCALE_ID, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions } from '@lucca-front/ng/core';
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
	imports: [FormFieldComponent, InputDirective, ReactiveFormsModule, FormFieldIdDirective, NumberFormatDirective, NgTemplateOutlet, ClearComponent],
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

	readonly formatStyle = input<NumberFormatStyle>('decimal');

	readonly useAutoPrefixSuffix = input<boolean | undefined>(undefined);

	readonly prefix = input<TextInputAddon | undefined>(undefined);

	readonly suffix = input<TextInputAddon | undefined>(undefined);

	readonly currency = input<string | undefined>(undefined);

	readonly currencyDisplay = input<NumberFormatCurrencyDisplay | undefined>(undefined);

	readonly unit = input<NumberFormatUnit | undefined>(undefined);

	readonly unitDisplay = input<NumberFormatUnitDisplay | undefined>(undefined);

	readonly min = input<number | undefined>(undefined);

	readonly max = input<number | undefined>(undefined);

	readonly placeholder = input<string>('');

	readonly hasClearer = input(false, { transform: booleanAttribute });

	readonly valueAlignRight = input(false, { transform: booleanAttribute });

	inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	#suffixPrefixValue = signal(1);

	readonly #numberFormat = computed(() => new NumberFormat(this.formatOptions()));
	readonly prefixAddon = computed(() => {
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
	readonly suffixAddon = computed(() => {
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

	readonly intl = input(...intlInputOptions(LU_NUMBERFORMATFIELD_TRANSLATIONS));

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
