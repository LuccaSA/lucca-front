import { Component } from '@angular/core';
import { LuPopup } from '@lucca-front/ng';
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
	template: `content of the popup`,
})
export class PocPopupInsideComponent {

}
