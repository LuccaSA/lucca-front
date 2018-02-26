import { Component } from '@angular/core';
@Component({
	selector: 'demo-api-basic',
	templateUrl: './basic.html',
})
export class BasicComponent {
	api = '/api/v3/users';
	item = { id: 1, name: 'and' };
	apiChanged() {}
}
