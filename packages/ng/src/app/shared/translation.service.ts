import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LuTranslateService {

	constructor(public translate: TranslateService) {
		translate.setDefaultLang('en');
	}

	setTranslations(translations: Object) {

		Object.keys(translations).forEach(lang => {
			this.translate.setTranslation(lang, translations[lang], true);
		});
	}

}
