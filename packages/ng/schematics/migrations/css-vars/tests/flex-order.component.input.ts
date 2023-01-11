import { Component } from '@angular/core';

@Component({
	selector: 'lu-test',
	template: `<div [class.u-order1]="isCurrentUser">
			<span class="mdr u-order1"> {{ 'EXPORT_CARD_TITLE_DATE' | transloco : { createdAt: date | date : 'medium' } }} </span>
			<span class="u-order-1"> {{ 'EXPORT_CARD_TITLE_DATE' | transloco : { createdAt: date | date : 'medium' } }} </span>
		</div>

		<span [ngClass]="{ 'u-textDefault u-order-1': true }"></span>`,
})
export class LuTestComponent {}
