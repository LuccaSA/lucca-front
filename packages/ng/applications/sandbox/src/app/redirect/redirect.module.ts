import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { RedirectInterceptor } from './redirect.interceptor';

@NgModule({
	imports: [
		HttpClientModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RedirectInterceptor, multi: true },
	],
})
export class RedirectModule {}
