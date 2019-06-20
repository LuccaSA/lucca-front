import { Component } from '@angular/core';
import { LolIntl } from './lol.intl';

@Component({
	selector: 'lu-lol',
	template: `lol: {{intl.lol}}`,
})
export class LolComponent {
	constructor(public intl: LolIntl) {}
}
