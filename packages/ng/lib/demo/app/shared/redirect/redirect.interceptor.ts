import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RedirectEnvironment } from './redirect.service';

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {
	constructor(private env: RedirectEnvironment) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		if (this.env.redirect && !req.url.startsWith('http')) {
			const clonedHeaders = req.headers;
			clonedHeaders.set('Access-Control-Allow-Origin', '*');
			const clonedRequest = req.clone({
				params: req.params.set('authToken', this.env.authToken),
				url: `https://${this.env.baseUrl}${req.url}`,
				headers: clonedHeaders,
			});
			return next.handle(clonedRequest);
		} else {
			return next.handle(req);
		}
	}
}
