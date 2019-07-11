import { Component } from '@angular/core';

@Component({
	selector: 'lu-split-operators-api',
	templateUrl: './split-operators-api.component.html'
})
export class SplitOperatorsApiComponent {
	item;
	user;
	searchFn(o, c) {
		return o.name.startsWith(c);
	}
	trackBy(idx, color): string {
		return color.code;
	}
}
