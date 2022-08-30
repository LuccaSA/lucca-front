import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuEstablishmentSearcherComponent } from './establishment-searcher.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, LuOptionModule],
	declarations: [LuEstablishmentSearcherComponent],
	exports: [LuEstablishmentSearcherComponent],
})
export class LuEstablishmentSearcherModule {}
