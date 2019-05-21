import { Component, Inject, Optional } from '@angular/core';
import { LuPopup, LuPopupRef, LU_POPUP_DATA, ILuPopupConfig } from '@lucca-front/ng';

@Component({
	selector: 'lu-poc-popup',
	templateUrl: './poc-popup.component.html'
})
export class PocPopupComponent {
	constructor(private _popup: LuPopup) {}
	open() {
		this._popup.open(PocPopupInsideComponent);
	}
	openWithConfig() {
		const config: ILuPopupConfig = {
			noBackdrop: true,
		};

		this._popup.open(PocPopupInsideComponent, 3, config);
	}
}


@Component({
	selector: 'lu-poc-popup-inside',
	templateUrl: './poc-popup.template.html',
})
export class PocPopupInsideComponent {
	constructor(
		protected _ref: LuPopupRef<PocPopupInsideComponent>,
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
		protected _ref: LuPopupRef<PocPopupSecondaryComponent>,
	) {}
	closePopup() {
		this._ref.close(8);
	}
}
