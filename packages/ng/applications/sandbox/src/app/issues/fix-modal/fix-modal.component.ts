import { Component } from '@angular/core';
import { LuModal } from '@lucca-front/ng';

@Component({
	selector: 'lu-fix-modal',
	templateUrl: './fix-modal.component.html'
})
export class FixModalComponent {
	constructor(private _modal: LuModal) {}
	open() {
		this._modal.open(BasicModalContent);
	}
}
@Component({
	selector: 'lu-modal-content',
	template: 'content'
})
export class BasicModalContent {
	title = 'title';
}
