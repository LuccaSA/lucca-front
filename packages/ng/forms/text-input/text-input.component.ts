import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, input, linkedSignal, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { ClearComponent } from '@lucca-front/ng/clear';
import { getIntl, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective, PresentationDisplayDirective } from '@lucca-front/ng/form-field';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from './text-input-addon';
import { LU_TEXTFIELD_TRANSLATIONS } from './text-input.translate';

type TextFieldType = 'text' | 'email' | 'password' | 'url';

@Component({
	selector: 'lu-text-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, NgxMaskDirective, ClearComponent, PresentationDisplayDirective],
	templateUrl: './text-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideNgxMask()],
})
export class TextInputComponent {
	readonly intl = getIntl(LU_TEXTFIELD_TRANSLATIONS);
	readonly ngControl = injectNgControl();

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

	readonly typeRef = linkedSignal(() => this.type());

	// eslint-disable-next-line @angular-eslint/no-output-native
	readonly blur = output<FocusEvent>();

	protected showPassword = signal<boolean>(false);

	protected hasTogglePasswordVisibilityIcon() {
		return this.typeRef() === 'password';
	}

	constructor() {
		ɵeffectWithDeps([this.showPassword], (showPassword) => this.typeRef.set(showPassword ? 'text' : this.type()));
	}

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}

	togglePasswordVisibility() {
		const _showPassword = this.showPassword();
		this.showPassword.set(!_showPassword);
	}
}
