import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyConfig, FieldType } from 'ng-formly';


// wrapper component
@Component({
	selector: 'lu-formly-wrapper-button',
	templateUrl: './button.html',
})
export class LuFormlyWrapperButton extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
	get class(): string {
		return this.to.button.class || '';
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
