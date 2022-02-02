import { NgModule } from '@angular/core';
import { LuEstablishmentSearcherComponent } from './establishment-searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuOptionModule } from '@lucca-front/ng/option';

@NgModule({
	imports: [
		HttpClientModule,
		ReactiveFormsModule,
		CommonModule,
		LuOptionModule,
	],
	declarations: [LuEstablishmentSearcherComponent],
	exports: [LuEstablishmentSearcherComponent],
})
export class LuEstablishmentSearcherModule {}
