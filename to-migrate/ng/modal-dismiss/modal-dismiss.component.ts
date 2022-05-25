import { Component, Inject } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { ALuPopupRef, ILuPopupRef, LuPopup } from '@lucca-front/ng/popup';
import { LuSidepanel } from '@lucca-front/ng/sidepanel';
import { Subject, Subscription } from 'rxjs';

/*tslint:disable*/
@Component({
	selector: 'lu-modal-dismiss',
	templateUrl: './modal-dismiss.component.html',
})
export class ModalDismissComponent {
	constructor(private _popup: LuPopup, private _modal: LuModal, private _sidepanel: LuSidepanel) {}

	event$ = new Subject();
	subs = new Subscription();
	get activeSubscriptions() {
		return this.subs['_subscriptions'] ? this.subs['_subscriptions'].length : 0;
	}

	openPopup(data?) {
		const ref = this._popup.open(BasicPopupContent, data);
		this.subs.add(ref.onDismiss.subscribe(() => this.event$.next('popup dismissed')));
		this.subs.add(ref.onClose.subscribe(() => this.event$.next('popup closed')));
	}
	openModal(data?) {
		const ref = this._modal.open(BasicModalContent, data);
		this.subs.add(ref.onDismiss.subscribe(() => this.event$.next('modal dismissed')));
		this.subs.add(ref.onClose.subscribe(() => this.event$.next('modal closed')));
	}
	openSidepanel(data?) {
		const ref = this._sidepanel.open(BasicModalContent, data);
		this.subs.add(ref.onDismiss.subscribe(() => this.event$.next('sidepanel dismissed')));
		this.subs.add(ref.onClose.subscribe(() => this.event$.next('sidepanel closed')));
	}
}
@Component({
	selector: 'lu-modal-content',
	template: `content of the modal component `,
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
	constructor(@Inject(ALuPopupRef) private _ref: ILuPopupRef) {}
	close() {
		this._ref.close(true);
	}
	dismiss() {
		this._ref.dismiss();
	}
}
