import { Component } from '@angular/core';
import { LuModal } from '@lucca-front/ng';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
	selector: 'lu-modal-dismiss',
	templateUrl: './modal-dismiss.component.html'
})
export class ModalDismissComponent {
	constructor(
		private _modal: LuModal,
	) {}
	openModal() {
		this._modal.open(ModalContennt);
	}
}
@Component({
	selector: 'lu-modal-content',
	template: `dismissing this modal calls some treatment before it disappears
	`
})
export class ModalContennt {
	title = 'title';
	cancelAction = () => of(true).pipe(
		tap(_ => console.log('dismiss start')),
		delay(2000),
		tap(_ => console.log('dismiss end')),
	)
}
