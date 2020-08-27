import { NgModule } from '@angular/core';
import { LuEstablishmentPagerModule } from './pager/index';
import { LuEstablishmentSelectInputModule } from './input/index';
import { LuEstablishmentSearcherModule } from './searcher/index';

@NgModule({
	imports: [
		LuEstablishmentPagerModule,
		LuEstablishmentSelectInputModule,
		LuEstablishmentSearcherModule,
	],
	exports: [
		LuEstablishmentPagerModule,
		LuEstablishmentSelectInputModule,
		LuEstablishmentSearcherModule,
	],
})
export class LuEstablishmentSelectModule {}
