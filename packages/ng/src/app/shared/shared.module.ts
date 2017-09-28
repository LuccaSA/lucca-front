import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateStore} from '@ngx-translate/core/src/translate.store';
import {LuTranslateService} from './translation.service';
import {MomentDateAdapter} from './moment/moment-date-adapter';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule.forRoot({loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}}),
	],
	declarations: [],
	providers: [LuTranslateService, TranslateService, TranslateStore, MomentDateAdapter],
	exports: [TranslateModule],
})
export class LuSharedModule { }
