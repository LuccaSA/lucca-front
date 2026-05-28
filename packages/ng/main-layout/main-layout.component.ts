import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-main-layout',
	styleUrl: './main-layout.component.scss',
	templateUrl: './main-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'mainLayout',
		role: 'main',
		id: 'main-content',
		tabindex: '-1',
	},
})
export class MainLayoutComponent {
	/**
	 * Sticks header on the screen
	 */
	readonly headerSticky = input(false, { transform: luBooleanAttribute });

	/**
	 * Sticks footer on the screen
	 */
	readonly footerSticky = input(false, { transform: luBooleanAttribute });
}
