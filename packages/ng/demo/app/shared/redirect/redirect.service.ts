import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/create';

@Injectable()
export class RedirectEnvironment {
	redirect = false;
	baseUrl = '';
	authToken = '';

	private _connected$ = new BehaviorSubject<boolean>(false);
	connected$ = this._connected$.asObservable();
	private _url$ = new BehaviorSubject<string>('');
	url$ = this._url$.asObservable();
	private _login$ = new BehaviorSubject<string>('');
	login$ = this._login$.asObservable();

	disableRedirect() {
		this.redirect = false;
		this._connected$.next(false);
		// this.connectedObserver.next(false);
	}
	loginSuccess(baseUrl, token, login) {
		this.baseUrl = baseUrl;
		this.authToken = token;
		this.redirect = true;
		this._connected$.next(true);
		this._login$.next(login);
		this._url$.next(baseUrl);
		// this.connectedObserver.next(true);
	}
}

@Injectable()
export class RedirectService {
	// redirect = false;
	// baseUrl = '';
	// authToken = '';

	constructor(
		private http: HttpClient,
		private env: RedirectEnvironment,
	) {}

	login(url, login, password = ''): Observable<boolean> {
		// disable redirection while we log in
		this.env.disableRedirect();
		const loginUrl = `https://${url}/auth/userlogin?login=${login}&password=${password}`;
		const options = {
			responseType: 'text',
			// responseType: 'text/plain',
		} as any;

		return this.http.post(loginUrl, {}, options)
		.map(r => {
			const token = (<any>r).substring(1, (<any>r).length - 1);
			this.env.loginSuccess(url, token, login);
			return true;
		});
	}
}
