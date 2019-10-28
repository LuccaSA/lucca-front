import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuRemoveDiacriticsPipe } from './remove-diacritics.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [LuRemoveDiacriticsPipe],
	exports: [LuRemoveDiacriticsPipe],
	providers: [],
})
export class LuRemoveDiacriticsModule { }
