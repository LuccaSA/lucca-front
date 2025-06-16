import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-app-layout',
	standalone: true,
	styleUrls: ['./app-layout.component.scss'],
	templateUrl: './app-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'appLayout',
		'[class.mod-mobileNavSideBottom]': 'mobileNavSideBottom()',
	},
})
export class AppLayoutComponent {
	mobileNavSideBottom = input(false, { transform: booleanAttribute });
}
