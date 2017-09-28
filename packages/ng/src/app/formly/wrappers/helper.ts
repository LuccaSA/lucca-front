import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyConfig, FieldType } from 'ng-formly';


// wrapper component
@Component({
	selector: 'lu-formly-wrapper-helper',
	styleUrls: ['wrappers.common.scss'],
	templateUrl: './helper.html',
})
export class LuFormlyWrapperHelper extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
// run to know when to add said wrapper
export class TemplateHelper {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.templateOptions && field.templateOptions.helper) {
				return 'helper';
			}
		});
	}
}
