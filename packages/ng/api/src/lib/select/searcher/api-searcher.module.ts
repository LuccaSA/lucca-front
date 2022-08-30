import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuOptionPlaceholderModule } from '@lucca-front/ng/option';
import { LuApiPagedSearcherComponent, LuApiSearcherComponent } from './api-searcher.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderModule],
	declarations: [LuApiSearcherComponent, LuApiPagedSearcherComponent],
	exports: [LuApiSearcherComponent, LuApiPagedSearcherComponent],
})
export class LuApiSearcherModule {}
