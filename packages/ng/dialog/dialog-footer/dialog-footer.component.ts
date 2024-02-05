import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dialog-footer',
	standalone: true,
	imports: [],
	templateUrl: './dialog-footer.component.html',
	styleUrl: './dialog-footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-footer footer',
		role: 'footer',
	},
})
export class DialogFooterComponent {}
