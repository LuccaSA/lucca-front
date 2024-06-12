import { booleanAttribute, Component, computed, ElementRef, inject, input, LOCALE_ID, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { NgIf } from '@angular/common';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { getIntl } from '@lucca-front/ng/core';
import { LU_NUMBERFORMATFIELD_TRANSLATIONS } from './number-format-input.translate';
import { injectNgControl } from '../inject-ng-control';
import { NumberFormat, NumberFormatCurrencyDisplay, NumberFormatDirective, NumberFormatOptions, NumberFormatStyle, NumberFormatUnit, NumberFormatUnitDisplay } from '@lucca-front/ng/number-format';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';

@Component({
	selector: 'lu-number-format-input',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, NgIf, ReactiveFormsModule, FormFieldIdDirective, NumberFormatDirective],
	templateUrl: './number-format-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class NumberFormatInputComponent {
	#locale = inject(LOCALE_ID);

	ngControl = injectNgControl();

	formatStyle = input<NumberFormatStyle>('decimal');

	currency = input<string | undefined>(undefined);

	currencyDisplay = input<NumberFormatCurrencyDisplay | undefined>(undefined);

	unit = input<NumberFormatUnit | undefined>(undefined);

	unitDisplay = input<NumberFormatUnitDisplay | undefined>(undefined);

	min = input<number | undefined>(undefined);

	max = input<number | undefined>(undefined);

	placeholder = input<string>('');

	hasClearer = input(false, { transform: booleanAttribute });

	inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	#suffixPrefixValue = toSignal(this.ngControl.valueChanges.pipe(startWith(1)));

	#numberFormat = computed(() => new NumberFormat(this.formatOptions()));
	prefix = computed(() => this.#numberFormat().getPrefix(this.#suffixPrefixValue() as number));
	suffix = computed(() => this.#numberFormat().getSuffix(this.#suffixPrefixValue() as number));

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

	protected readonly viewChild = viewChild;
}
