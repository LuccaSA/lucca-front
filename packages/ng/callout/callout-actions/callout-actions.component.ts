import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-callout-actions',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'callout-content-description-actions',
		'[class.mod-inline]': 'inline()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutActionsComponent {
	readonly inline = input(false, { transform: luBooleanAttribute });
}
