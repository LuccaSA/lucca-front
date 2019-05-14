import { Component } from '@angular/core';
import { LuModal, LuPopupRef } from '@lucca-front/ng';

@Component({
	selector: 'lu-poc-modal',
	templateUrl: './poc-modal.component.html'
})
export class PocModalComponent {
	constructor(private _luModal: LuModal) {}
	open() {
		this._luModal.open(PocModalInsideComponent);
	}
}
@Component({
	selector: 'lu-poc-modal-inside',
	template: `
	<h1>title</h1>
	<section>content n stuff</section>
	`,
})
export class PocModalInsideComponent {
	constructor(
		protected _ref: LuPopupRef<PocModalInsideComponent>,
	) {}
	closeModal() {
		this._ref.close();
	}
}
