import { Component, Inject } from '@angular/core';
import { LuModal, LuSidepanel, LuPopup, ILuPopupRef, ALuPopupRef } from '@lucca-front/ng';
import { Subject, Subscription } from 'rxjs';

/*tslint:disable*/
@Component({
	selector: 'lu-modal-dismiss',
	templateUrl: './modal-dismiss.component.html'
})
export class ModalDismissComponent {
	constructor(
		private _popup: LuPopup,
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}

	event$ = new Subject();
	subs = new Subscription();
	get activeSubscriptions() { return this.subs['_subscriptions'] ? this.subs['_subscriptions'].length : 0; }


	openPopup(data?) {
		const ref = this._popup.open(BasicPopupContent, data);
		this.subs.add(ref.onDismiss.subscribe(
			() => this.event$.next('popup dismissed'),
		));
		this.subs.add(ref.onClose.subscribe(() => this.event$.next('popup closed')))
	}
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
	submitAction = () => true;

	constructor(
	) {}
}
@Component({
	selector: 'lu-popup-content',
	template: `popup <br />
		<button class="button" (click)="close()">close</button>
		<button class="button" (click)="dismiss()">dismiss</button>
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
		this._ref.dismiss(true);
	}
}
