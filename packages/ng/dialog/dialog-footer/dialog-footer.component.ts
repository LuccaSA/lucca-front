import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dialog-footer',
	standalone: true,
	template: '<ng-content></ng-content>',
	styleUrl: './dialog-footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-footer footer',
		role: 'footer',
	},
})
export class DialogFooterComponent {}
