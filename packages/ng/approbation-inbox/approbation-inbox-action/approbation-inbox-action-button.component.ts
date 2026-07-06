import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { injectMediaMinBreakpoint } from '@lucca-front/ng/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[lu-approbation-inbox-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'approbationInbox-list-item-content-action',
		'[class.is-current]': 'mediaMinM() && current()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxButtonComponent {
	readonly current = input(false, { transform: booleanAttribute });

	readonly mediaMinM = injectMediaMinBreakpoint('M');
}
