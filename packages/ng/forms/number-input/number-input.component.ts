import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, input, model, numberAttribute, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
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

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	readonly placeholder = input<string>('');

	readonly step = input<number, number>(1, { transform: numberAttribute });

	readonly noSpinButtons = input(false, { transform: booleanAttribute });

	readonly hasClearer = input(false, { transform: booleanAttribute });

	readonly inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	readonly prefix = input<TextInputAddon>();

	readonly suffix = input<TextInputAddon>();

	readonly min = input<number>();

	readonly max = input<number>();

	readonly valueAlignRight = input(false, { transform: booleanAttribute });

	readonly intl = input(...intlInputOptions(LU_NUMBERFIELD_TRANSLATIONS));

	onInput(input: HTMLInputElement): void {
		this.value.set(Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber);
	}

	clearValue(): void {
		this.value.set(null);
		this.inputElementRef().nativeElement.focus();
	}
}
