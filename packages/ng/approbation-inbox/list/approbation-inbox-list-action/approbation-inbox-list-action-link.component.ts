import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { injectMediaMinBreakpoint } from '@lucca-front/ng/core';

@Component({
	selector: 'a[lu-approbation-inbox-list-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'approbationInbox-list-content-items-item-content-action',
		'[attr.aria-current]': 'mediaMinM() && current() ? "page" : null',
		'[attr.role]': '!mediaMinM() ? "button" : null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxLinkComponent {
	readonly current = input(false, { transform: booleanAttribute });

	readonly mediaMinM = injectMediaMinBreakpoint('M');
}
