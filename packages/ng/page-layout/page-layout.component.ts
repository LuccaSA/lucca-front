import { booleanAttribute, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-page-layout',
	standalone: true,
	styleUrls: ['./page-layout.component.scss'],
	templateUrl: './page-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'pageLayout',
	},
})
export class PageLayoutComponent {
	mobileNavSideBottom = input(false, { transform: booleanAttribute });

	@HostBinding('class.mod-mobileNavSideBottom')
	get mobileNavSideBottomInput() {
		return this.mobileNavSideBottom();
	}
}
