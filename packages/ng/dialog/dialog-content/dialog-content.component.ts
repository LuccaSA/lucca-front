import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dialog-content',
	standalone: true,
	template: '<ng-content></ng-content>',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-content',
	},
})
export class DialogContentComponent {}
