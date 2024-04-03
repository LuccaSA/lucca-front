import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="pr-u-margin400 pr-u-rowGap300"></span>`,
	host: {
		class: 'pr-u-padding400',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'pr-u-padding400 pr-u-columnGap200',
	class: 'pr-u-padding400',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.pr-u-padding400') a = true;

	classes = ['pr-u-padding0', 'pr-u-columnGap800'];

	byProp = {
		classes: 'pr-u-padding400 pr-u-columnGap200',
	};
}
