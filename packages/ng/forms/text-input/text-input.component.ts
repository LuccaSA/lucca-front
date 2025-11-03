import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, ElementRef, EventEmitter, input, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { getIntl } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from './text-input-addon';
import { LU_TEXTFIELD_TRANSLATIONS } from './text-input.translate';

type TextFieldType = 'text' | 'email' | 'password' | 'url';

@Component({
	selector: 'lu-text-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, NgxMaskDirective],
	templateUrl: './text-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	providers: [provideNgxMask()],
})
export class TextInputComponent {
	ngControl = injectNgControl();

	mask = input<string | null>(null);

	@Input()
	placeholder: string = '';

	@Input()
	autocomplete: AutoFill = 'off';

	@Input({ transform: booleanAttribute })
	hasClearer = false;

	@Input({ transform: booleanAttribute })
	hasSearchIcon = false;

	@Input({ transform: booleanAttribute })
	valueAlignRight = false;

	@ViewChild('inputElement', { static: true })
	inputElementRef: ElementRef<HTMLInputElement>;

	@Input()
	prefix: TextInputAddon;

	@Input()
	suffix: TextInputAddon;

	@Output()
	// eslint-disable-next-line @angular-eslint/no-output-native
	blur = new EventEmitter<FocusEvent>();

	@Input()
	get type(): TextFieldType {
		return this.showPassword ? 'text' : this._type;
	}

	set type(type: TextFieldType) {
		this._type = type;
	}

	@Input()
	/**
	 * Search icon to use for when `hasSearchIcon` is true, defaults to 'search'
	 */
	searchIcon: LuccaIcon = 'searchMagnifyingGlass';

	showPassword: boolean = false;

	private _type: TextFieldType = 'text';

	protected hasTogglePasswordVisibilityIcon() {
		return this._type === 'password';
	}

	intl = getIntl(LU_TEXTFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef.nativeElement.focus();
	}

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}
}
