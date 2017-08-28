import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LuTranslateService {

  constructor(public translate: TranslateService) {
  	translate.setDefaultLang('en');
	}

	setTranslation(lang: string, translations: Object) {
		this.translate.setTranslation(lang, translations, true);
	}

}
