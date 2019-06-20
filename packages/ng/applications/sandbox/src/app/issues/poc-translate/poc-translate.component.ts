import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
	selector: 'lu-poc-translate',
	templateUrl: './poc-translate.component.html'
})
export class PocTranslateComponent {
	constructor(@Inject(LOCALE_ID) public locale) {}
}
