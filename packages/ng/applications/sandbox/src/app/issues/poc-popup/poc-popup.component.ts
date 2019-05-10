import { Component, Inject, Optional } from '@angular/core';
import { LuPopup, LuPopupRef, LU_POPUP_DATA } from '@lucca-front/ng';
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
		const ref = this._popup.open(PocPopupInsideComponent, 3);
		ref.onClose.subscribe(r => console.log(r))
	}
	
}


@Component({
	selector: 'lu-poc-popup-inside',
	template: `
	<h1>title {{data}}</h1>
	<button class="button" (click)="openSecondary()">open other popup</button>
	<button class="button" (click)="closePopup()">close</button>
	`,
})
export class PocPopupInsideComponent {
	constructor(
		protected _ref: LuPopupRef,
		protected _popup: LuPopup,
		@Optional() @Inject(LU_POPUP_DATA) public data,
		) {}
	closePopup() {
		this._ref.close(8);
	}
	openSecondary() {
		this._popup.open(PocPopupSecondaryComponent);
	}
}
@Component({
	selector: 'lu-poc-popup-secondary',
	template: `
	<h1>title {{data}}</h1>
	<button class="button" (click)="closePopup()">close</button>
	`,
})
export class PocPopupSecondaryComponent {
	constructor(
		protected _ref: LuPopupRef,
	) {}
	closePopup() {
		this._ref.close(8);
	}
}
