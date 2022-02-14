import { NgModule } from '@angular/core';
import { LuOptionSearcherComponent } from './option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LuOptionPlaceholderModule } from '../../placeholder/index';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderModule],
	declarations: [LuOptionSearcherComponent],
	exports: [LuOptionSearcherComponent],
})
export class LuOptionSearcherModule {}
