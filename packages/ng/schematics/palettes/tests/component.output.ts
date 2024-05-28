import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="palette-product"></span>`,
	host: {
		class: 'palette-neutral',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'palette-product',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.palette-brand') a = true;

	classes = ['palette-neutral', 'palette-brand'];

	byProp = {
		classes: 'palette-neutral palette-brand',
	};
}
