import { Component } from '@angular/core';

@Component({
	selector: 'sand-ivy-api-select',
	templateUrl: './ivy-api-select.component.html'
})
export class IvyApiSelectComponent {
	item = null;
	user = null;
	collection = [];
	searchFn(o, c) {
		return o.name.startsWith(c);
	}
	trackBy(idx, item): string {
		return item.code;
	}
}
