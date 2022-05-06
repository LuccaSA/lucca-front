import { Component, Inject, Optional } from '@angular/core';
import { ALuPopupRef, ILuPopupConfig, LuPopup, LU_POPUP_DATA } from '@lucca-front/ng/popup';

@Component({
	selector: 'lu-poc-popup',
	templateUrl: './poc-popup.component.html',
})
export class PocPopupComponent {
	constructor(private _popup: LuPopup) {}
	open() {
		this._popup.open(PocPopupInsideComponent);
	}
	openWithConfig() {
		const config: ILuPopupConfig = {
			noBackdrop: true,
			size: 'bigger',
		};

		this._popup.open(PocPopupInsideComponent, 3, config);
	}
	top() {
		this._popup.open(PocPopupInsideComponent, 3, { position: 'top' });
	}
	bottom() {
		this._popup.open(PocPopupInsideComponent, 3, { position: 'bottom' });
	}
	left() {
		this._popup.open(PocPopupInsideComponent, 3, { position: 'left' });
	}
	right() {
		this._popup.open(PocPopupInsideComponent, 3, { position: 'right' });
	}
}

@Component({
	selector: 'lu-poc-popup-inside',
	templateUrl: './poc-popup.template.html',
})
export class PocPopupInsideComponent {
	constructor(protected _ref: ALuPopupRef<PocPopupInsideComponent>, protected _popup: LuPopup, @Optional() @Inject(LU_POPUP_DATA) public data) {}
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
		<h1>title {{ data }}</h1>
		<button type="button" class="button" (click)="closePopup()">close</button>
	`,
})
export class PocPopupSecondaryComponent {
	constructor(protected _ref: ALuPopupRef<PocPopupSecondaryComponent>, @Optional() @Inject(LU_POPUP_DATA) public data) {}
	closePopup() {
		this._ref.close(8);
	}
}
