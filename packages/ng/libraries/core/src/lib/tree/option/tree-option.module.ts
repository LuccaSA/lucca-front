import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';

@NgModule({
	imports: [
		LuTreeOptionItemModule,
	],
	exports: [
		LuTreeOptionItemModule,
	],
})
export class LuTreeOptionModule {}
