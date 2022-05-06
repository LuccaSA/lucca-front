import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuToastsComponent } from './toasts.component';
import { LuToastIntl } from './toasts.intl';
import { LU_TOAST_TRANSLATIONS } from './toasts.token';
import { luToastTranslations } from './toasts.translate';

@NgModule({
	declarations: [LuToastsComponent],
	imports: [CommonModule],
	exports: [LuToastsComponent],
	providers: [
		LuToastIntl,
		{
			provide: LU_TOAST_TRANSLATIONS,
			useValue: luToastTranslations,
		},
	],
})
export class LuToastsModule {}
