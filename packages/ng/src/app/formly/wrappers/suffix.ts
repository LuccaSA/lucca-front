import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyConfig, FieldType } from 'ng-formly';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-suffix',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './suffix.html',
})
export class LuFormlyWrapperSuffix extends FieldWrapper {
	@ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
// run to know when to add said wrapper
export class TemplateSuffix {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.templateOptions && field.templateOptions.suffix && !field.templateOptions.icon) {
				return 'suffix';
			}
		});
	}
}
