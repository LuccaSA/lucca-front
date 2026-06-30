import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[lu-approbation-inbox-action], button[lu-approbation-inbox-action]',
	templateUrl: './approbation-inbox-action.component.html',
	styleUrl: './approbation-inbox-action.component.scss',
	encapsulation: ViewEncapsulation.None,

	host: {
		class: 'approbationInbox-list-item-content-action',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxActionComponent {}
