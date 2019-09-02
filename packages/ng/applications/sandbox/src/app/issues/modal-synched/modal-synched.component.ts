import { Component } from '@angular/core';
import { LuModal } from '@lucca-front/ng';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'lu-modal-synched',
	templateUrl: './modal-synched.component.html'
})
export class ModalSynchedComponent {
	constructor(
		private _modal: LuModal,
	) {}
	openSyncModal() {
		this._modal.open(SyncModalContent);
	}
	openAsyncModal() {
		this._modal.open(AsyncModalContent);
	}
}
@Component({
	selector: 'lu-sync-modal-content',
	template: `the submit on this modal resolves synchronously
	`
})
export class SyncModalContent {
	title = 'title';
	submitAction = () => true;
}
@Component({
	selector: 'lu-async-modal-content',
	template: `the submit on this modal resolves asynchronously
	`
})
export class AsyncModalContent {
	title = 'title';
	submitAction = () => of(true).pipe(delay(500));
}
