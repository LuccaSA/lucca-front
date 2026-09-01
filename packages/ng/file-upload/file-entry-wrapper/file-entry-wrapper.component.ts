import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-file-entry-wrapper',
	template: '<ng-content />',
	styleUrl: './file-entry-wrapper.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'fileEntryDisplayWrapper',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileEntryWrapperComponent {}
