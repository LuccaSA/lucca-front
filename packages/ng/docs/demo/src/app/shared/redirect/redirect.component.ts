import { Component } from '@angular/core';
import {
	RedirectService,
	RedirectEnvironment,
	RedirectStatus,
} from './redirect.service';
import { of } from 'rxjs/observable/of';

@Component({
	selector: 'demo-redirect',
	templateUrl: './redirect.component.html',
})
export class RedirectComponent {
	url = 'lucca.local.dev';
	login = 'passepartout';
	password = '';

	status$ = this.env.status$;
	url$ = this.env.url$;
	login$ = this.env.login$;

	connected$ = this.status$.map(s => s === RedirectStatus.connected);
	connecting$ = this.status$.map(s => s === RedirectStatus.connecting);
	disconnected$ = this.status$.map(s => s === RedirectStatus.disconnected);
	error$ = this.status$.map(s => s === RedirectStatus.error);

	loading = false;
	constructor(
		private service: RedirectService,
		private env: RedirectEnvironment,
	) {}

	connect() {
		this.loading = true;
		const loginRequest = this.service.login(this.url, this.login, this.password);

		loginRequest.subscribe(() => {
			this.loading = false;
		});
		loginRequest.catch(err => of(err))
		.subscribe(err => {
			console.log(err);
			this.loading = false;
		});
	}
}
