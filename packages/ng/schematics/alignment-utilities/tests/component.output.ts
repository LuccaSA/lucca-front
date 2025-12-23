import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="pr-u-colorTextBrand"></span>`,
	host: {
		class: 'pr-u-textAlignStart',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'pr-u-textAlignCenter',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.pr-u-textAlignEnd') a = true;

	classes = ['pr-u-textAlignEnd', 'pr-u-textAlignStart'];

	byProp = {
		classes: 'pr-u-textAlignEnd pr-u-textAlignStart',
	};
}
