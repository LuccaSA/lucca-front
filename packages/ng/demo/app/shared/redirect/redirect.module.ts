import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { RedirectComponent } from './redirect.component';
import { LuEmptyModule } from '../../../../src/app/empty/empty.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		LuEmptyModule,
	],
	declarations: [
		RedirectComponent,
	],
	exports: [
		RedirectComponent,
	],
	providers: [
	],
})
export class RedirectModule { }
