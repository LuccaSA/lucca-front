import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LuSharedModule} from '../shared/shared.module';

import { LuLolComponent } from './lol.component';

@NgModule({
	imports: [
		CommonModule,
		LuSharedModule,
	],
	declarations: [
		LuLolComponent,
	],
	exports: [
		LuLolComponent,
	],
})
export class LuLolModule { }

export { LuLolComponent } from './lol.component';
