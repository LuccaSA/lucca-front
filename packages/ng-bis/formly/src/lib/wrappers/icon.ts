import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import {
	FieldWrapper,
	FormlyFieldConfig,
	FormlyConfig,
	FieldType,
} from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-suffix',
	styleUrls: ['flex-layout.scss', 'suffixes.common.scss'],
	templateUrl: './icon.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperIcon extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	fieldComponent: ViewContainerRef;
}
// run to know when to add said wrapper
export class TemplateIcon {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			// if (field && field.type === 'date') {
			// 	field.templateOptions.icon = 'calendar';
			// 	return 'icon';
			// }
			// if (field && field.type === 'api') {
			// 	field.templateOptions.icon = 'search';
			// 	return 'icon';
			// }
			if (field && field.templateOptions && field.templateOptions.icon) {
				return 'icon';
			}
		});
	}
}
