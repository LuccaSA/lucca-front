import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="pr-u-colorTextBrand"></span>`,
	host: {
		class: 'pr-u-colorTextProduct',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'pr-u-colorTextAI',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.pr-u-colorTextLime') a = true;

	classes = ['pr-u-colorTextLagoon', 'pr-u-colorTextBlueberry'];

	byProp = {
		classes: 'pr-u-colorTextLagoon pr-u-colorTextBlueberry',
	};
}
