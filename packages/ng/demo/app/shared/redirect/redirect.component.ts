import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-redirect',
	templateUrl: './redirect.component.html',
})
export class RedirectComponent implements OnInit {

	url = 'https://lucca.local.dev';
	login = 'passepartout';
	constructor() { }

	ngOnInit() {
	}

	connect() {	}

}
