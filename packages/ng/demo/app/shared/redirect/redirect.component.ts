import { Component, OnInit } from '@angular/core';
import { RedirectService, RedirectEnvironment } from './redirect.service';

@Component({
	selector: 'demo-redirect',
	templateUrl: './redirect.component.html',
})
export class RedirectComponent implements OnInit {

	url = 'lucca.local.dev';
	login = 'passepartout';
	password = '';

	connected$ = this.env.connected$;
	url$ = this.env.url$;
	login$ = this.env.login$;

	loading = false;
	constructor(private service: RedirectService, private env: RedirectEnvironment) { }

	ngOnInit() {
	}

	connect() {
		this.loading = true;
		this.service.login(this.url, this.login, this.password)
		.subscribe(() => {
			this.loading = false;
		});
	}
}
