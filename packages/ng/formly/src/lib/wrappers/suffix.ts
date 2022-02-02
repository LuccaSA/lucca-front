import {
	ChangeDetectionStrategy,
	Component,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
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
	templateUrl: './suffix.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyWrapperSuffix extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;
}
// run to know when to add said wrapper
export class TemplateSuffix {
	run(fc: FormlyConfig) {
		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (
				field &&
				field.templateOptions &&
				field.templateOptions['suffix'] &&
				!field.templateOptions['icon']
			) {
				return 'suffix';
			}
			return '';
		});
	}
}
