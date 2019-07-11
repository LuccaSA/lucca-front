import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import {
	FieldWrapper,
	FormlyFieldConfig,
	FormlyConfig,
	FieldType,
} from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-title',
	styleUrls: ['wrappers.common.scss'],
	templateUrl: './title.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperTitle extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	fieldComponent: ViewContainerRef;
}
// run to know when to add said wrapper
export class TemplateTitle {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.templateOptions && field.templateOptions.title) {
				return 'title';
			}
		});
	}
}
