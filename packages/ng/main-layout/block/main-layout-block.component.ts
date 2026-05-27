import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-main-layout-block',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<ng-content />`,
	host: {
		class: 'mainLayout-content-inside-block',
		'[class.mod-overflow]': 'overflow()',
	},
})
export class MainLayoutBlockComponent {
	readonly overflow = input(false, { transform: luBooleanAttribute });
}
