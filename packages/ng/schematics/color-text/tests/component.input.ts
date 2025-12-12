import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="pr-u-textLucca"></span>`,
	host: {
		class: 'pr-u-textProduct',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'pr-u-textAI',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.pr-u-textLime') a = true;

	classes = ['pr-u-textLagoon', 'pr-u-textBlueberry'];

	byProp = {
		classes: 'pr-u-textLagoon pr-u-textBlueberry',
	};
}
