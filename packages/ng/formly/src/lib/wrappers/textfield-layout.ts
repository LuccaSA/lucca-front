import {
	ChangeDetectionStrategy,
	Component,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import {
	FieldWrapper,
	FormlyFieldConfig,
	FormlyConfig,
	FieldType,
} from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-layout',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './textfield-layout.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperTextfieldLayout extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;

	get mod() {
		return this.to['mod'] || '';
	}

	get modMultiline() {
		return !!this.field && this.field.type === 'textarea'
			? 'mod-multiline'
			: '';
	}

	get modWithSuffix() {
		return !!this.to && !!this.to['suffix'] ? 'mod-withSuffix' : '';
	}

	get isRequired() {
		return !!this.to && !!this.to.required ? 'is-required' : '';
	}

	get isDisabled() {
		return !!this.to && !!this.to.disabled ? 'is-disabled' : '';
	}

	get isFocused() {
		return !!this.to && this.to['_isFocused'] ? 'is-focused' : '';
	}

	get isError() {
		return this.formControl.invalid && this.formControl.touched
			? 'is-error'
			: '';
	}
}
