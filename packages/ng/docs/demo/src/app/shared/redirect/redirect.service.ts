import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export enum RedirectStatus {
	disconnected,
	connecting,
	connected,
}

@Injectable()
export class RedirectEnvironment {
	redirect = false;
	baseUrl = '';
	authToken = '';

	private _status$ = new BehaviorSubject<RedirectStatus>(
		RedirectStatus.disconnected,
	);
	status$ = this._status$.asObservable();
	private _url$ = new BehaviorSubject<string>('');
	url$ = this._url$.asObservable();
	private _login$ = new BehaviorSubject<string>('');
	login$ = this._login$.asObservable();

	connecting() {
		this.redirect = false;
		this._status$.next(RedirectStatus.connecting);
	}
	loginSuccess(baseUrl, token, login) {
		this.baseUrl = baseUrl;
		this.authToken = token;
		this.redirect = true;
		this._status$.next(RedirectStatus.connected);
		this._login$.next(login);
		this._url$.next(baseUrl);
	}
	loginError() {
		this._status$.next(RedirectStatus.disconnected);
	}
}

@Injectable()
export class RedirectService {
	// redirect = false;
	// baseUrl = '';
	// authToken = '';

	constructor(private http: HttpClient, private env: RedirectEnvironment) {}

	login(url, login, password = ''): Observable<RedirectStatus> {
		// disable redirection while we log in
		this.env.connecting();
		const loginUrl = `https://${url}/auth/userlogin?login=${login}&password=${password}`;
		const options = {
			responseType: 'text',
		} as any;

		return this.http
			.post(loginUrl, {}, options)
			.map(r => {
				const token = (<any>r).substring(1, (<any>r).length - 1);
				this.env.loginSuccess(url, token, login);
				return RedirectStatus.connected;
			})
			.catch(r => {
				this.env.loginError();
				return Observable.throw(RedirectStatus.disconnected);
			});
	}
}
