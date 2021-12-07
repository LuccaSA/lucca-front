import { Component, Input, ViewChild, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	FormlyFieldConfig,
	FieldWrapper,
	FormlyConfig,
} from '@ngx-formly/core';

// wrapper
@Component({
	selector: 'lu-formly-wrapper-error',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './error.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperError extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;

	override readonly formControl: FormControl;

	get validationId() {
		return this.field.id + '-message';
	}
}

// component that display the right error message
@Component({
	selector: 'lu-formly-error-message',
	template: `<div class="textfield-messages-error" *ngFor="let message of errorMessages">{{ message }}</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyErrorMessage {
	@Input() fieldForm: FormControl;
	@Input() field: FormlyFieldConfig;

	constructor() {}

	get errorMessages(): string[] {
		const messages = [];
		if (!!this.fieldForm.errors) {
			Object.keys(this.fieldForm.errors).forEach(key => {
				if (
					this.field.validation &&
					this.field.validation.messages &&
					this.field.validation.messages[key]
				) {
					messages.push(this.field.validation.messages[key]);
				}
			});
		}
		return messages;
	}
}

// run to know when to add said wrapper
export class TemplateError {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.validation) {
				return 'error';
			}
		});
	}
}
