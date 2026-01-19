import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="u-textCenter"></span>`,
	host: {
		class: 'u-textLeft',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'u-textCenter',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.u-textRight') a = true;

	classes = ['u-textRight', 'u-textLeft'];

	byProp = {
		classes: 'u-textRight u-textLeft',
	};
}
