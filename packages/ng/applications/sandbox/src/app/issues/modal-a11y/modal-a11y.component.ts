import { Component } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';

@Component({
	selector: 'lu-modal-content',
	template: `content of the modal component`
})
export class BasicModalContent {
	title = 'title';
	submitAction = () => true;
}
@Component({
	selector: 'sand-modal-a11y',
	templateUrl: './modal-a11y.component.html'
})
export class ModalA11yComponent {
	constructor(
		private _modal: LuModal
	) {}
	openModal() {
		this._modal.open(BasicModalContent);
	}
}

