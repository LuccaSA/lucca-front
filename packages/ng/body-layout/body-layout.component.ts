import { booleanAttribute, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-body-layout',
	standalone: true,
	styleUrls: ['./body-layout.component.scss'],
	templateUrl: './body-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'bodyLayout',
	},
})
export class BodyLayoutComponent {
	mobileNavSideBottom = input(false, { transform: booleanAttribute });

	@HostBinding('class.mod-mobileNavSideBottom')
	get mobileNavSideBottomInput() {
		return this.mobileNavSideBottom();
	}
}
