import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule, LU_OPTION_SELECT_ALL_TRANSLATIONS } from '@lucca-front/ng/option';
import { LuEstablishmentSelectAllComponent } from './establishment-select-all.component';
import { luEstablishmentSelectAllTranslations } from './establishment-select-all.translate';

@NgModule({
	imports: [CommonModule, LuInputModule, LuOptionModule],
	declarations: [LuEstablishmentSelectAllComponent],
	exports: [LuEstablishmentSelectAllComponent],
	providers: [
		{
			provide: LU_OPTION_SELECT_ALL_TRANSLATIONS,
			useValue: luEstablishmentSelectAllTranslations,
		},
	],
})
export class LuEstablishmentSelectAllModule {}
