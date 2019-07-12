import { Component } from '@angular/core';
import { LuModal, LuPopup, LuSidepanel } from '@lucca-front/ng';
import { of } from 'rxjs';

@Component({
	selector: 'lu-fix-modal',
	templateUrl: './fix-modal.component.html'
})
export class FixModalComponent {
	constructor(
		private _popup: LuPopup,
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}
	openPopup() {
		this._popup.open(BasicModalContent);
	}
	openModal() {
		this._modal.open(BasicModalContent);
	}
	openSidepanel() {
		this._sidepanel.open(BasicModalContent);
	}
}
@Component({
	selector: 'lu-modal-content',
	template: 'content'
})
export class BasicModalContent {
	title = 'title';
	submitAction = () => of(true);
}
