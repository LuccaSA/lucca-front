import { Component } from '@angular/core';
import { ALuDateAdapter } from '@lucca-front/ng/core';

@Component({
	selector: 'sand-date-string',
	templateUrl: './date-string.component.html'
})
export class DateStringComponent {
	constructor(private _adapter: ALuDateAdapter<string>) {}
	today = this._adapter.forgeToday();
	valentines = this._adapter.forge(2020, 2, 14);
}
