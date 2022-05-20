import { Component, Inject } from '@angular/core';
import { LuPopup, ALuPopupRef, ILuPopupRef } from '@lucca-front/ng/popup';
import { LuModal } from '@lucca-front/ng/modal';
import { LuSidepanel } from '@lucca-front/ng/sidepanel';
@Component({
	selector: 'sand-modal-undismissable',
	templateUrl: './modal-undismissable.component.html'
})
export class ModalUndismissableComponent {
	undismissable = false;
	constructor(
		private _popup: LuPopup,
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}
	openPopup(data?) {
		const ref = this._popup.open(BasicPopupContent, data, { undismissable: this.undismissable});
	}
	openModal(data?) {
		const ref = this._modal.open(BasicModalContent, data, { undismissable: this.undismissable});
	}
	openSidepanel(data?) {
		const ref = this._sidepanel.open(BasicModalContent, data, { undismissable: this.undismissable});
	}
}
@Component({
	selector: 'lu-modal-content',
	template: `content of the modal component
	`
})
export class BasicModalContent {
	title = 'title';
	submitAction = () => true;
}
@Component({
	selector: 'lu-popup-content',
	template: `popup <br />
		<button type="button" class="button" (click)="close()">close</button>
		<button type="button" class="button" (click)="dismiss()">dismiss</button>
	`
})
export class BasicPopupContent {
	constructor(
		@Inject(ALuPopupRef) private _ref: ILuPopupRef,
	) {}
	close() {
		this._ref.close(true);
	}
	dismiss() {
		this._ref.dismiss();
	}
}
