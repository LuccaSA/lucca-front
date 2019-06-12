import { Component } from '@angular/core';

@Component({
	selector: 'lu-department-select-issue',
	templateUrl: './department-select.component.html'
})
export class DepartmentSelectComponent {
	collection = [];
	searchFn(o, c) {
		return o.name.toLowerCase().startsWith(c.toLowerCase());
	}
}
