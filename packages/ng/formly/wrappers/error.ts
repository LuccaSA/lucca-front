import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldTypeConfig, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { buildAddWrapperExtension } from '../formly.utils';

// component that display the right error message
@Component({
	selector: 'lu-formly-error-message',
	template: `
		@for (message of errorMessages; track $index) {
			<div class="textfield-messages-error">
				{{ message }}
			</div>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyErrorMessage {
	@Input() formControl?: FormControl;
	@Input() field: FormlyFieldConfig;

	get errorMessages(): string[] {
		const messages: string[] = [];
		if (this.formControl?.errors) {
			Object.keys(this.formControl.errors).forEach((key) => {
				if (this.field.validation?.messages?.[key]) {
					messages.push(this.field.validation.messages[key] as string);
				}
			});
		}
		return messages;
	}
}

// wrapper
@Component({
	selector: 'lu-formly-wrapper-error',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './error.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, LuFormlyErrorMessage],
})
export class LuFormlyWrapperError extends FieldWrapper<FieldTypeConfig> {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;

	get validationId() {
		return this.field.id + '-message';
	}
}

export const templateErrorExtension = buildAddWrapperExtension('error', (field) => !!field.validation);
