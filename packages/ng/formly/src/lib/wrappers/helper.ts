import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import {
	FieldWrapper,
	FormlyFieldConfig,
	FormlyConfig,
	FieldType,
} from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-helper',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './helper.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperHelper extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;
}
// run to know when to add said wrapper
export class TemplateHelper {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.templateOptions && field.templateOptions.helper) {
				return 'helper';
			}
			return '';
		});
	}
}
