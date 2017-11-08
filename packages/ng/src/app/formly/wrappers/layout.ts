import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyConfig, FieldType } from 'ng-formly';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-layout',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './layout.html',
})
export class LuFormlyWrapperLayout extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

	get mod() {
		return this.to.mod || '';
	}

	get modMultiline() {
		return !!this.field && this.field.type === 'textarea' ? 'mod-multiline' : '';
	}

	get modWithSuffix() {
		return !!this.to && !!this.to.suffix ? 'mod-withSuffix' : '';
	}

	get isFocused() {
		return (!!this.to && this.to._isFocused) ? 'is-focused' : '';
	}

	get isError() {
		return (this.formControl.invalid && this.formControl.touched) ? 'is-error' : '';
	}
}
