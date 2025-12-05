import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

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
	},
})
export class MainLayoutComponent {
	readonly headerSticky = input(false, { transform: booleanAttribute });
	readonly footerSticky = input(false, { transform: booleanAttribute });
}
