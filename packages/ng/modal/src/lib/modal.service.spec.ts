import { Component, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { BehaviorSubject } from 'rxjs';
import { ILuModalContent } from './modal.model';
import { LuModalModule } from './modal.module';
import { LuModal } from './modal.service';

@Component({
	selector: 'lu-test-modal',
	standalone: true,
	template: `Content`,
})
export class ModalContentComponent implements ILuModalContent {
	title = new BehaviorSubject('OriginalTitle');
}

@Component({
	selector: 'lu-test-opener',
	template: `Content`,
})
export class ModalOpenerComponent {
	constructor(public modal: LuModal) {}
}

describe('LuModal', () => {
	let spectator: Spectator<ModalOpenerComponent>;

	const createComponent = createComponentFactory<ModalOpenerComponent>({
		component: ModalOpenerComponent,
		imports: [LuModalModule],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	function openModal<T extends ILuModalContent>(type: Type<T>): T {
		spectator.component.modal.open(type);
		return spectator.debugElement.parent.query(By.directive(type)).componentInstance as T;
	}

	function getModalTitle(): string {
		return spectator.query('.lu-modal-header-title', { root: true }).innerHTML;
	}

	it("should update modal title when ILuModalContent's title emits a new value", () => {
		// Arrange
		const contentComponent = openModal(ModalContentComponent);
		spectator.detectChanges();

		// Act
		const beforeTitle = getModalTitle();

		contentComponent.title.next('UpdatedTitle');
		spectator.detectChanges();

		const afterTitle = getModalTitle();

		// Assert
		expect(beforeTitle).toBe('OriginalTitle');
		expect(afterTitle).toBe('UpdatedTitle');
	});
});
