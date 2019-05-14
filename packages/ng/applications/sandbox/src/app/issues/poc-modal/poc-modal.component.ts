import { Component } from '@angular/core';
import { LuModal, ALuModalRef } from '@lucca-front/ng';

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
		only the content in this injected component
	`,
})
export class PocModalInsideComponent {
	title = 'title of the component';
	constructor(
		protected _ref: ALuModalRef<PocModalInsideComponent>,
	) {}
	closeModal() {
		this._ref.close();
	}
}
