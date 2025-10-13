import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-main-layout',
	standalone: true,
	styleUrl: './main-layout.component.scss',
	templateUrl: './main-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'mainLayout',
		role: 'main',
		id: 'main-content',
		tabindex: '0',
	},
})
export class MainLayoutComponent {
	headerSticky = input(false, { transform: booleanAttribute });
	footerSticky = input(false, { transform: booleanAttribute });
}
