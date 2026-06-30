import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[lu-approbation-inbox-action]',
	template: '<ng-content />',
	styleUrl: './approbation-inbox-action.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'approbationInbox-list-item-content-action',
		'[attr.aria-current]': 'current() ? "page" : null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxLinkComponent {
	readonly current = input(false, { transform: booleanAttribute });
}
