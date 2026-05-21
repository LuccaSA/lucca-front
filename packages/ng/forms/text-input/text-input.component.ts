import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputAddon } from './text-input-addon';
import { LU_TEXTFIELD_TRANSLATIONS } from './text-input.translate';

type TextFieldType = 'text' | 'email' | 'password' | 'url';

@Component({
	selector: 'lu-text-input',
	imports: [InputDirective, FormFieldIdDirective, NgTemplateOutlet, NgxMaskDirective, FormsModule, ClearComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './text-input.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		provideNgxMask(),
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextInputComponent),
			multi: true,
		},
	],
})
export class TextInputComponent implements ControlValueAccessor {
	readonly intl = input(...intlInputOptions(LU_TEXTFIELD_TRANSLATIONS));

	readonly inputElementRef = viewChild<ElementRef<HTMLInputElement>>('inputElement');

	readonly mask = input<string | null>(null);

	readonly placeholder = input<string>('');

	readonly autocomplete = input<AutoFill>('off');

	readonly hasClearer = input(false, { transform: booleanAttribute });

	readonly hasSearchIcon = input(false, { transform: booleanAttribute });

	readonly valueAlignRight = input(false, { transform: booleanAttribute });

	readonly prefix = input<TextInputAddon>();

	readonly suffix = input<TextInputAddon>();

	/**
	 * Search icon to use for when `hasSearchIcon` is true, defaults to 'search'
	 */
	readonly searchIcon = input<LuccaIcon>('searchMagnifyingGlass');

	readonly type = input<TextFieldType>('text');

	// eslint-disable-next-line @angular-eslint/no-output-native
	readonly blur = output<FocusEvent>();

	protected readonly showPassword = signal<boolean>(false);

	protected readonly typeRef = computed(() => (this.showPassword() ? 'text' : this.type()));

	protected readonly hasTogglePasswordVisibilityIcon = computed(() => this.type() === 'password');

	readonly value = signal<string>('');
	readonly inputDisabled = signal<boolean>(false);

	private onChange: (value: string) => void = () => {};
	private onTouched: () => void = () => {};

	writeValue(value: string): void {
		this.value.set(value ?? '');
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.inputDisabled.set(isDisabled);
	}

	onMaskModelChange(val: string): void {
		this.value.set(val);
		this.onChange(val);
	}

	onBlur(event: FocusEvent): void {
		this.onTouched();
		this.blur.emit(event);
	}

	clearValue(): void {
		this.value.set('');
		this.onChange('');
		const el = this.inputElementRef()?.nativeElement;
		if (el) {
			el.value = '';
			el.focus();
		}
	}

	togglePasswordVisibility() {
		const _showPassword = this.showPassword();
		this.showPassword.set(!_showPassword);
	}
}
