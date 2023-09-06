import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-layout',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './textfield-layout.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyWrapperTextfieldLayout extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;

	get mod() {
		return (this.props['mod'] || '') as string;
	}

	get modMultiline() {
		return !!this.field && this.field.type === 'textarea' ? 'mod-multiline' : '';
	}

	get modWithSuffix() {
		return !!this.props && !!this.props['suffix'] ? 'mod-withSuffix' : '';
	}

	get isRequired() {
		return !!this.props && !!this.props.required ? 'is-required' : '';
	}

	get isDisabled() {
		return !!this.props && !!this.props.disabled ? 'is-disabled' : '';
	}

	get isFocused() {
		return !!this.props && this.props['_isFocused'] ? 'is-focused' : '';
	}

	get isError() {
		return this.formControl.invalid && this.formControl.touched ? 'is-error' : '';
	}
}
