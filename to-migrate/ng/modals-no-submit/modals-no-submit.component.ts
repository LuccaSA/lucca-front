import { Component } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { LuSidepanel } from '@lucca-front/ng/sidepanel';

@Component({
	selector: 'lu-modals-no-submit',
	templateUrl: './modals-no-submit.component.html'
})
export class ModalsNoSubmitComponent {
	constructor(
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}
	openModal(data?) {
		this._modal.open(BasicModalContent, data);
	}
	openSidepanel(data?) {
		this._sidepanel.open(BasicModalContent, data);
	}
}
@Component({
	selector: 'lu-modal-content',
	template: `content of the modal component
	`
})
export class BasicModalContent {
	title = 'title';

	constructor(
	) {}
}
