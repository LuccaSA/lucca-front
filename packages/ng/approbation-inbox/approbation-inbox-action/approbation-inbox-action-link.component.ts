import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { injectMediaMinBreakpoint } from '@lucca-front/ng/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[lu-approbation-inbox-action]',
	template: '<ng-content />',
	styleUrl: './approbation-inbox-action.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'approbationInbox-list-item-content-action',
		'[attr.aria-current]': 'mediaMinM() && current() ? "page" : null',
		'[attr.role]': '!mediaMinM() ? "button" : null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxLinkComponent {
	readonly current = input(false, { transform: booleanAttribute });

	readonly mediaMinM = injectMediaMinBreakpoint('M');
}
