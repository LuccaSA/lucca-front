import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuOptionPlaceholderModule } from '@lucca-front/ng/option';
import { LuUserPagedSearcherComponent } from './user-searcher.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderModule],
	declarations: [LuUserPagedSearcherComponent],
	exports: [LuUserPagedSearcherComponent],
})
export class LuUserSearcherModule {}
