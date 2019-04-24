import { Component } from '@angular/core';
import { LuPopup } from '@lucca-front/ng';

@Component({
	selector: 'lu-poc-popup',
	templateUrl: './poc-popup.component.html'
})
export class PocPopupComponent {
	constructor(private _popup: LuPopup) {}
	open() {
		this._popup.open(PocPopupInsideComponent);
	}
}


@Component({
	selector: 'lu-poc-popup-inside',
	template: `content of the popup`,
})
export class PocPopupInsideComponent {

}
