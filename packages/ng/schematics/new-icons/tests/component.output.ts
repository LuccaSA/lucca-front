import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a <lu-icon icon="app" />`,
	host: {
		class: 'lu-icon icon-app',
		'class.icon-app': 'true',
	},
})
export class TestComponent {}

export const outsideIconByProp = {
	app: 'icon-app',
	arrow: 'icon-arrowChevronBottom',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.icon-app') a = true;
	@HostBinding('class.icon-app.icon-arrowChevronBottom') b = true;

	icons = ['icon-app', 'icon-arrowChevronBottom'];

	iconByProp = {
		app: 'icon-app',
		arrow: 'icon-arrowChevronBottom',
	};
}
