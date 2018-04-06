import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LuEmptyModule } from '../../../../src/app/empty/empty.module';

import { RedirectComponent } from './redirect.component';
import { RedirectService, RedirectEnvironment } from './redirect.service';
import { RedirectInterceptor } from './redirect.interceptor';

@NgModule({
	imports: [CommonModule, FormsModule, LuEmptyModule, HttpClientModule],
	declarations: [RedirectComponent],
	exports: [RedirectComponent],
	providers: [
		RedirectEnvironment,
		RedirectService,
		{ provide: HTTP_INTERCEPTORS, useClass: RedirectInterceptor, multi: true },
	],
})
export class RedirectModule {}
