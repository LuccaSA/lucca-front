import { Component, OnInit } from '@angular/core';
import {
	RedirectService,
	RedirectEnvironment,
	RedirectStatus,
} from './redirect.service';

@Component({
	selector: 'demo-redirect',
	templateUrl: './redirect.component.html',
})
export class RedirectComponent implements OnInit {
	url = 'lucca.local.dev';
	login = 'passepartout';
	password = '';

	status$ = this.env.status$;
	url$ = this.env.url$;
	login$ = this.env.login$;

	connected$ = this.status$.map(s => s === RedirectStatus.connected);
	connecting$ = this.status$.map(s => s === RedirectStatus.connecting);
	disconnected$ = this.status$.map(s => s === RedirectStatus.disconnected);

	loading = false;
	constructor(
		private service: RedirectService,
		private env: RedirectEnvironment,
	) {}

	ngOnInit() {
		/*
		Comment in order to let people choose to connect and enter the right env before connecting
		if (!this.env.redirect) {
			this.connect();
		}
		*/
	}

	connect() {
		this.loading = true;
		this.service.login(this.url, this.login, this.password).subscribe(() => {
			this.loading = false;
		});
	}
}
