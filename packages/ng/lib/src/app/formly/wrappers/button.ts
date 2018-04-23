import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import {
	FieldWrapper,
	FormlyFieldConfig,
	FormlyConfig,
	FieldType,
} from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-button',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './button.html',
})
export class LuFormlyWrapperButton extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef })
	fieldComponent: ViewContainerRef;
	get className(): string {
		return this.to.button.className || '';
	}
}
// run to know when to add said wrapper
export class TemplateButton {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.templateOptions && field.templateOptions.button) {
				return 'button';
			}
		});
	}
}
