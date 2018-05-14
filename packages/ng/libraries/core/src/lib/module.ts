import { NgModule } from '@angular/core';
import { LuUserModule } from './user';

@NgModule({
	imports: [
		LuUserModule,
	],
	exports: [
		LuUserModule,
	],
})
export class LuModule {}
