import { Component } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `<div [class.u-flexOrder1]="isCurrentUser">
			<span class="mdr u-flexOrder1"> {{ 'EXPORT_CARD_TITLE_DATE' | transloco : { createdAt: date | date : 'medium' } }} </span>
			<span class="u-flexOrderMinus1"> {{ 'EXPORT_CARD_TITLE_DATE' | transloco : { createdAt: date | date : 'medium' } }} </span>
		</div>

		<span [ngClass]="{ 'u-textDefault u-flexOrderMinus1': true }"></span>`,
})
export class LuTestComponent {}
