import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LuEstablishmentPagerComponent } from './establishment-pager.component';

@NgModule({
	imports: [
		HttpClientModule,
	],
	declarations: [
		LuEstablishmentPagerComponent,
	],
	exports: [
		LuEstablishmentPagerComponent,
	],
})
export class LuEstablishmentPagerModule {}
