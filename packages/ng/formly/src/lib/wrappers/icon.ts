import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-suffix',
	styleUrls: ['flex-layout.scss', 'suffixes.common.scss'],
	templateUrl: './icon.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyWrapperIcon extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;
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
			if (field && field.templateOptions && field.templateOptions['icon']) {
				return 'icon';
			}
			return '';
		});
	}
}
