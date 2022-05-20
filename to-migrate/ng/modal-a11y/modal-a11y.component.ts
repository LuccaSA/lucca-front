import { Component } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { LuSidepanel } from '@lucca-front/ng/sidepanel';
const MAGIC_POSITIONS = [
	'center',
	'top',
	'right',
	'bottom',
	'left',
];
const MAGIC_SIZES = [
	'small',
	'medium',
	'large',
];
@Component({
	selector: 'lu-modal-content',
	template: `
	<p>content of the modal component</p>
	<button type="button" class="button" (click)="openModal()">more modals</button>
	<button type="button" class="button" (click)="incr()">incr</button>
	`
})
export class BasicModalContent {
	title = 'title';
	submitAction = () => true;
	// submitPalette = 'warning';
	submitCounter = 0;
	get submitDisabled() { return this.submitCounter % 2; }
	constructor(
		private _modal: LuModal,
	) {}
	openModal() {
		const randPosition = Math.floor(Math.random() * 5);
		const randSize = Math.floor(Math.random() * 3);
		const config = { position: undefined, size: undefined };
		config.position = MAGIC_POSITIONS[randPosition];
		config.size = MAGIC_SIZES[randSize];

		this._modal.open(BasicModalContent, undefined, config);
	}
	incr() {
		this.submitCounter++;
	}
}
@Component({
	selector: 'sand-modal-a11y',
	templateUrl: './modal-a11y.component.html'
})
export class ModalA11yComponent {
	constructor(
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}
	openModal() {
		this._modal.open(BasicModalContent);
	}
	openSidepanel() {
		this._sidepanel.open(BasicModalContent);
	}
}
