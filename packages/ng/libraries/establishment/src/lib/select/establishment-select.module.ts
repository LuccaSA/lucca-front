import { NgModule } from '@angular/core';
import { LuEstablishmentPagerModule } from './pager/index';

@NgModule({
	imports: [
		LuEstablishmentPagerModule,
	],
	exports: [
		LuEstablishmentPagerModule,
	],
})
export class LuEstablishmentSelectModule {}
