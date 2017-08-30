import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'demo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Lucca front ng demo';

	constructor(public translate: TranslateService) {
		this.switchToLang('en');
	}

	switchToLang(lang: string) {
		this.translate.use(lang);
	}
}
