import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyValidationMessages, FieldWrapper, FormlyConfig } from 'ng-formly';
import * as _ from 'underscore';

// wrapper
@Component({
	selector: 'lu-formly-wrapper-error',
	templateUrl: './error.html',
})
export class LuFormlyWrapperError extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

	get validationId() {
		return this.field.id + '-message';
	}
}

// component that display the right error message
@Component({
	selector: 'lu-formly-error-message',
	template: `<div class="input-error" *ngFor="let message of errorMessages">{{ message }}</div>`,
})
export class LuFormlyErrorMessage {
	@Input() fieldForm: FormControl;
	@Input() field: FormlyFieldConfig;

	constructor(private formlyMessages: FormlyValidationMessages) {}

	get errorMessages(): string[] {
		if (!!this.fieldForm.errors) {
			return _.chain(this.fieldForm.errors)
			.mapObject((val, key) => {
				if (this.field.validation && this.field.validation.messages && this.field.validation.messages[key]) {
					return this.field.validation.messages[key];
				}
				return undefined;
			})
			.without(undefined)
			.value();
		} else {
			return [];
		}
	}
}

// run to know when to add said wrapper
export class TemplateError {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.validators) {
				return 'error';
			}
		});
	}
}