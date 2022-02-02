import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuApiSearcherModule } from '@lucca-front/ng/api';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuForGroupsModule, LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputModule } from '@lucca-front/ng/select';
import { LuQualificationSelectInputComponent } from './qualification-select-input.component';
import { LuQualificationSelectInputIntl } from './qualification-select-input.intl';
import { LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS } from './qualification-select-input.token';
import { luQualificationSelectInputTranslations } from './qualification-select-input.translate';

@NgModule({
	imports: [
		CommonModule,
		LuInputModule,
		LuOptionModule,
		LuSelectInputModule,
		LuForGroupsModule,
		LuApiSearcherModule,
	],
	declarations: [LuQualificationSelectInputComponent],
	exports: [LuQualificationSelectInputComponent],
	providers: [
		{
			provide: LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS,
			useValue: luQualificationSelectInputTranslations,
		},
		LuQualificationSelectInputIntl,
	],
})
export class LuQualificationSelectInputModule {}
