import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

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
	readonly inline = input(false, { transform: booleanAttribute });
}
