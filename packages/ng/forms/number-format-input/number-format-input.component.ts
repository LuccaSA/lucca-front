import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, LOCALE_ID, model, output, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { NumberFormat, NumberFormatCurrencyDisplay, NumberFormatDirective, NumberFormatOptions, NumberFormatStyle, NumberFormatUnit, NumberFormatUnitDisplay } from '@lucca-front/ng/number-format';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFORMATFIELD_TRANSLATIONS } from './number-format-input.translate';

@Component({
	selector: 'lu-number-format-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NumberFormatDirective, NgTemplateOutlet, ClearComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './number-format-input.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFormatInputComponent implements FormValueControl<number | null> {
	#locale = inject(LOCALE_ID);

	readonly value = model<number | null>(null);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	protected readonly formControl = new FormControl<number | null>(null);

	constructor() {
		effect(() => this.formControl.setValue(this.value(), { emitEvent: false }));
		this.formControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((v) => this.value.set(v ?? null));
		effect(() => (this.disabled() ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false })));
	}

	readonly formatStyle = input<NumberFormatStyle>('decimal');

	readonly useAutoPrefixSuffix = input(false, { transform: booleanAttribute });

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

	readonly #numberFormat = computed(() => new NumberFormat(this.formatOptions()));
	readonly prefixAddon = computed(() => {
		if (this.useAutoPrefixSuffix() === false) {
			return this.prefix();
		}
		const content = this.#numberFormat().getPrefix(this.value());
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
		const content = this.#numberFormat().getSuffix(this.value());
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

	readonly formattedValue = computed(() => this.#numberFormat().getBlurFormat(this.value()));

	readonly intl = input(...intlInputOptions(LU_NUMBERFORMATFIELD_TRANSLATIONS));

	clearValue(): void {
		this.value.set(null);
		this.inputElementRef()?.nativeElement.focus();
	}
}
