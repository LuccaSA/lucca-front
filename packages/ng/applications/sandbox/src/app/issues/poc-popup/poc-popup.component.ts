import { Component } from '@angular/core';
import { LuPopup, LuPopupRef } from '@lucca-front/ng';
import { timer } from 'rxjs';

@Component({
	selector: 'lu-poc-popup',
	templateUrl: './poc-popup.component.html'
})
export class PocPopupComponent {
	constructor(private _popup: LuPopup) {}
	open() {
		this._popup.open(PocPopupInsideComponent);
	}
	openV2() {
		const ref = this._popup.openV2(PocPopupInsideComponent);
		// timer(1000).subscribe(() => ref.close());
	}
	
}


@Component({
	selector: 'lu-poc-popup-inside',
	template: `
	<h1>title</h1>
	<button class="button" (click)="closePopup()">close</button>
	`,
})
export class PocPopupInsideComponent {
	constructor(protected _ref: LuPopupRef) {}
	closePopup() {
		this._ref.close();
	}
}
