import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-approbation-inbox-list-subtle',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'approbationInbox-list-content-items-item-content-info-data-subtle',
	},
})
export class ApprobationInboxSubtleComponent {}
