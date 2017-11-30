import { Component } from '@angular/core';
@Component({
	selector: 'demo-api-nopicker',
	templateUrl: './nopicker.html',
})
export class NopickerComponent {
	api = '/api/v3/axissections';
	item = undefined;
	apiChanged() {
		this.item = undefined;
	}
}
