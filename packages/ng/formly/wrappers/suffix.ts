import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { buildAddWrapperExtension } from '../formly.utils';

// wrapper component
@Component({
	selector: 'lu-formly-wrapper-suffix',
	styleUrls: ['flex-layout.scss', 'suffixes.common.scss'],
	templateUrl: './suffix.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LuFormlyWrapperSuffix extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
	override fieldComponent: ViewContainerRef;
}

export const templateSuffixExtension = buildAddWrapperExtension('suffix', (field) => !!field?.props?.['suffix'] && !field?.props?.['icon']);
