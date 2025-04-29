import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-main-layout',
	standalone: true,
	styleUrls: ['./main-layout.component.scss'],
	templateUrl: './main-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	host: {
		class: 'mainLayout',
		role: 'main',
	},
})
export class MainLayoutComponent {
	headerSticky = input(false, { transform: booleanAttribute });
	footerSticky = input(false, { transform: booleanAttribute });
	withAside = input(false, { transform: booleanAttribute });

	@HostBinding('class.mod-withAside')
	get withAsideInput() {
		return this.withAside();
	}
}
