import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions, isNotNil, luBooleanAttribute, luNumberAttribute, PortalDirective } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from './text-input-addon';
import { LU_TEXTFIELD_TRANSLATIONS } from './text-input.translate';

type TextFieldType = 'text' | 'email' | 'password' | 'url';

@Component({
	selector: 'lu-text-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, NgxMaskDirective, ClearComponent, ɵPresentationDisplayDefaultDirective, PortalDirective],
	templateUrl: './text-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideNgxMask()],
})
export class TextInputComponent {
	/**
	 * Overrides the default translations (partial overrides are merged with the defaults)
	 */
	readonly intl = input(...intlInputOptions(LU_TEXTFIELD_TRANSLATIONS));
	readonly ngControl = injectNgControl();

	readonly inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	/**
	 * Input mask applied to the value (ngx-mask syntax), no mask when null
	 */
	readonly mask = input<string | null>(null);

	/**
	 * Placeholder of the input
	 */
	readonly placeholder = input<string>('');

	/**
	 * Value of the native `autocomplete` attribute, defaults to 'off'
	 */
	readonly autocomplete = input<AutoFill>('off');

	/**
	 * Displays a button to clear the value when the input is not empty
	 */
	readonly hasClearer = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays a search icon at the end of the input
	 */
	readonly hasSearchIcon = input(false, { transform: luBooleanAttribute });

	/**
	 * Aligns the value to the right
	 */
	readonly valueAlignRight = input(false, { transform: luBooleanAttribute });

	/**
	 * Content or icon displayed before the input, with its accessible label
	 */
	readonly prefix = input<TextInputAddon>();

	/**
	 * Content or icon displayed after the input, with its accessible label
	 */
	readonly suffix = input<TextInputAddon>();

	/**
	 * Value of the native `minlength` attribute, not set when 0 (default)
	 */
	readonly minlength = input<number>(0, { transform: luNumberAttribute });
	/**
	 * Value of the native `maxlength` attribute, not set when 0 (default)
	 */
	readonly maxlength = input<number>(0, { transform: luNumberAttribute });

	/**
	 * Search icon to use when `hasSearchIcon` is true, defaults to 'searchMagnifyingGlass'
	 */
	readonly searchIcon = input<LuccaIcon>('searchMagnifyingGlass');

	/**
	 * Type of the native input, defaults to 'text'. 'password' adds a button to toggle the value visibility
	 */
	readonly type = input<TextFieldType>('text');

	/**
	 * Emits when the native input loses focus
	 */
	// eslint-disable-next-line @angular-eslint/no-output-native
	readonly blur = output<FocusEvent>();

	protected readonly showPassword = signal<boolean>(false);

	protected readonly typeRef = computed(() => (this.showPassword() ? 'text' : this.type()));

	protected readonly hasTogglePasswordVisibilityIcon = computed(() => this.type() === 'password');

	protected hasValue(): boolean {
		const value: unknown = this.ngControl.value;
		return isNotNil(value) && value !== '';
	}

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef()?.nativeElement.focus();
	}

	togglePasswordVisibility() {
		const _showPassword = this.showPassword();
		this.showPassword.set(!_showPassword);
	}
}
