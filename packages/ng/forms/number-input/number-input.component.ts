import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, input, model, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions, luBooleanAttribute, luNullableNumberAttribute, luNumberAttribute, luOptionalNumberAttribute } from '@lucca-front/ng/core';
import { FormFieldWidth, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFIELD_TRANSLATIONS } from './number-input.translate';

@Component({
	selector: 'lu-number-input',
	imports: [InputDirective, FormFieldIdDirective, NgTemplateOutlet, ClearComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './number-input.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent implements FormValueControl<number | null> {
	readonly value = model<number | null>(null);

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly touch = output<void>();

	readonly placeholder = input<string>('');

	readonly step = input(1, { transform: luNumberAttribute });

	readonly noSpinButtons = input(false, { transform: luBooleanAttribute });

	readonly hasClearer = input(false, { transform: luBooleanAttribute });

	readonly inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	readonly prefix = input<TextInputAddon>();

	readonly suffix = input<TextInputAddon>();

	readonly min = input(undefined, { transform: luOptionalNumberAttribute });

	readonly max = input(undefined, { transform: luOptionalNumberAttribute });

	readonly valueAlignRight = input(false, { transform: luBooleanAttribute });

	/**
	 * Width of the input itself, using the same scale as the form field width
	 */
	readonly width = input(null, { transform: luNullableNumberAttribute<FormFieldWidth> });

	protected readonly widthClass = computed(() => (this.width() ? `mod-width${this.width()}` : null));

	readonly intl = input(...intlInputOptions(LU_NUMBERFIELD_TRANSLATIONS));

	onInput(input: HTMLInputElement): void {
		this.value.set(Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber);
	}

	clearValue(): void {
		this.value.set(null);
		this.inputElementRef().nativeElement.focus();
	}
}
