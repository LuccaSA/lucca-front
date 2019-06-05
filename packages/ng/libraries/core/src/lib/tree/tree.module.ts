import { NgModule } from '@angular/core';
import { LuTreeOptionModule } from './option/index';

@NgModule({
	imports: [
		LuTreeOptionModule,
	],
	exports: [
		LuTreeOptionModule,
	],
})
export class LuTreeModule {}
