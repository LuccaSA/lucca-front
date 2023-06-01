import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { buildAddWrapperExtension } from '../formly.utils';

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

export const templateIconExtension = buildAddWrapperExtension('icon', (field) => !!field?.props?.['icon']);
