import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuRemoveDiacriticsPipe } from './remove-diacritics.pipe';
import { LuDummyRemoveDiacriticsPipe } from './dummy-remove-diacritics.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [LuRemoveDiacriticsPipe],
	providers: [
		{
			provide: LuRemoveDiacriticsModule,
			useClass: String.prototype.normalize == null ? LuDummyRemoveDiacriticsPipe : LuRemoveDiacriticsPipe,
		}
	],
})
export class LuRemoveDiacriticsModule { }
