import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `I'm an inline template with a class to migrate <span class="u-marginL u-rowGapM"></span>`,
	host: {
		class: 'u-paddingL',
	},
})
export class TestComponent {}

export const byProp = {
	classes: 'u-paddingL u-columnGapS',
	class: 'u-paddingL',
};

@Component({
	selector: 'lu-test2',
	templateUrl: './template.input.html',
})
export class Test2Component {
	@HostBinding('class.u-paddingL') a = true;

	classes = ['u-padding0', 'u-columnGapXXL'];

	byProp = {
		classes: 'u-paddingL u-columnGapS',
	};
}
