import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { buildAddWrapperExtension } from '../formly.utils';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-helper',
	styleUrls: ['flex-layout.scss'],
	templateUrl: './helper.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyWrapperHelper extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;
}

export const templateHelperExtension = buildAddWrapperExtension('helper', (field) => !!field?.props?.['helper']);
