import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { buildAddWrapperExtension } from '../formly.utils';

// wrapper component
// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
	selector: 'lu-formly-wrapper-suffix',
	styleUrls: ['flex-layout.scss', 'suffixes.common.scss'],
	templateUrl: './icon.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyWrapperIcon extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;
}

export const templateIconExtension = buildAddWrapperExtension('icon', (field) => !!field?.props?.['icon']);
