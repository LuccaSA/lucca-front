import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions, luBooleanAttribute, luNumberAttribute, luOptionalNumberAttribute } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFIELD_TRANSLATIONS } from './number-input.translate';

@Component({
	selector: 'lu-number-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, ClearComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './number-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
	ngControl = injectNgControl();

	/**
	 * Placeholder of the input
	 */
	readonly placeholder = input<string>('');

	/**
	 * Value of the native `step` attribute, defaults to 1
	 */
	readonly step = input(1, { transform: luNumberAttribute });

	/**
	 * Hides the native spin buttons
	 */
	readonly noSpinButtons = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays a button to clear the value when the input is not empty
	 */
	readonly hasClearer = input(false, { transform: luBooleanAttribute });

	readonly inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	/**
	 * Content or icon displayed before the input, with its accessible label
	 */
	readonly prefix = input<TextInputAddon>();

	/**
	 * Content or icon displayed after the input, with its accessible label
	 */
	readonly suffix = input<TextInputAddon>();

	/**
	 * Value of the native `min` attribute
	 */
	readonly min = input(undefined, { transform: luOptionalNumberAttribute });

	/**
	 * Value of the native `max` attribute
	 */
	readonly max = input(undefined, { transform: luOptionalNumberAttribute });

	/**
	 * Aligns the value to the right
	 */
	readonly valueAlignRight = input(false, { transform: luBooleanAttribute });

	/**
	 * Overrides the default translations (partial overrides are merged with the defaults)
	 */
	readonly intl = input(...intlInputOptions(LU_NUMBERFIELD_TRANSLATIONS));

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
