import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="palette-primary"></span>`,
	host: {
		class: 'palette-grey',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'palette-secondary',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.palette-lucca') a = true;

	classes = ['palette-grey', 'palette-lucca'];

	byProp = {
		classes: 'palette-grey palette-lucca',
	};
}
