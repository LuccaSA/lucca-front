import { NgModule } from '@angular/core';
import { LuTreeOptionSearcherComponent } from './tree-option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuOptionPlaceholderModule } from '../../placeholder/index';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderModule],
	declarations: [LuTreeOptionSearcherComponent],
	exports: [LuTreeOptionSearcherComponent],
})
export class LuTreeOptionSearcherModule {}
