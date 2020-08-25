import { NgModule } from '@angular/core';
import { LuEstablishmentPagerModule } from './pager/index';
import { LuEstablishmentSelectInputModule } from './input/index';

@NgModule({
	imports: [
		LuEstablishmentPagerModule,
		LuEstablishmentSelectInputModule,
	],
	exports: [
		LuEstablishmentPagerModule,
		LuEstablishmentSelectInputModule,
	],
})
export class LuEstablishmentSelectModule {}
