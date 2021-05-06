import { Component } from '@angular/core';
import { ILuModalContent, LuModal } from '@lucca-front/ng/modal';

@Component({
	selector: 'comm-in-app-modal',
	templateUrl: './comm-modal.html'
})
export class CommModal implements ILuModalContent {
	title: string = '';
}

@Component({
	selector: 'sand-comm-in-app-modal',
	templateUrl: './comm-in-app-modal.component.html'
})
export class CommInAppModalComponent {
	constructor(
		private _modal: LuModal
	){}

	public openModal(): void {
		this._modal.open(CommModal, {}, {
			panelClass: ['lu-popup-panel', 'mod-commInApp']
		});
	}
}
