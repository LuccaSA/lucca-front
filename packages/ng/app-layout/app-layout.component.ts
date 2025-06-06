import { booleanAttribute, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-app-layout',
	standalone: true,
	styleUrls: ['./app-layout.component.scss'],
	templateUrl: './app-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'appLayout',
	},
})
export class AppLayoutComponent {
	mobileNavSideBottom = input(false, { transform: booleanAttribute });

	@HostBinding('class.mod-mobileNavSideBottom')
	get mobileNavSideBottomInput() {
		return this.mobileNavSideBottom();
	}
}
