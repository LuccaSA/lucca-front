import { Component } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a <lu-icon icon="apps" />`,
	host: {
		class: 'lu-icon icon-apps',
		'class.icon-apps': 'true',
	},
})
export class TestComponent {}

export const outsideIconByProp = {
	app: 'icon-apps',
	arrow: 'icon-arrowSouth',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
	host: {
		class: 'icon-apps, icon-apps.icon-arrowSouth'
	}
})
export class Test2Component {
	icons = ['icon-apps', 'icon-arrowSouth'];

	iconByProp = {
		app: 'icon-apps',
		arrow: 'icon-arrowSouth',
	};
}
