import { NgIf, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from './text-input-addon';
import { LU_TEXTFIELD_TRANSLATIONS } from './text-input.translate';

type TextFieldType = 'text' | 'email' | 'password';

@Component({
	selector: 'lu-text-input',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, NgIf, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet],
	templateUrl: './text-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class TextInputComponent {
	ngControl = injectNgControl();

	@Input()
	placeholder: string = '';

	@Input({ transform: booleanAttribute })
	hasClearer = false;

	@Input({ transform: booleanAttribute })
	hasSearchIcon = false;

	@ViewChild('inputElement', { static: true })
	inputElementRef: ElementRef<HTMLInputElement>;

	@Input()
	prefix: TextInputAddon;

	@Input()
	suffix: TextInputAddon;

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
	searchIcon: LuccaIcon = 'search';

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
