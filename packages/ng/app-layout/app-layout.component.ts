import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-app-layout',
	styleUrl: './app-layout.component.scss',
	templateUrl: './app-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'appLayout',
		'[class.mod-mobileNavSideBottom]': 'mobileNavSideBottom()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
	/**
	 * Applies mobile nav side on bottom
	 */
	readonly mobileNavSideBottom = input(false, { transform: booleanAttribute });
}
