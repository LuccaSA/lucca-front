import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { injectMediaMinBreakpoint } from '@lucca-front/ng/core';

@Component({
	selector: 'button[lu-approbation-inbox-list-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'approbationInbox-list-content-items-item-content-action',
		'[class.is-current]': 'mediaMinM() && current()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxButtonComponent {
	readonly current = input(false, { transform: booleanAttribute });

	readonly mediaMinM = injectMediaMinBreakpoint('M');
}
