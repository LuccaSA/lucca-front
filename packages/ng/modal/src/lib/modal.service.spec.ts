import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LuModalModule } from 'dist/ng/modal';
import { BehaviorSubject } from 'rxjs';
import { ILuModalContent } from './modal.model';
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
	let opener: ModalOpenerComponent;
	let fixture: ComponentFixture<ModalOpenerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalOpenerComponent],
			imports: [LuModalModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalOpenerComponent);
		opener = fixture.componentInstance;
		fixture.detectChanges();
	});

	function openModal<T>(type: Type<T>): T {
		opener.modal.open(type);
		return fixture.debugElement.parent.query(By.directive(type)).componentInstance as T;
	}

	function getModalTitle(): string {
		const titleElement = fixture.debugElement.parent.query(By.css('.lu-modal-header-title')).nativeElement as HTMLElement;
		return titleElement.innerHTML;
	}

	it("should update modal title when ILuModalContent's title emits a new value", () => {
		// Arrange
		const contentComponent = openModal(ModalContentComponent);
		fixture.detectChanges();

		// Act
		const beforeTitle = getModalTitle();

		contentComponent.title.next('UpdatedTitle');
		fixture.detectChanges();

		const afterTitle = getModalTitle();

		// Assert
		expect(beforeTitle).toBe('OriginalTitle');
		expect(afterTitle).toBe('UpdatedTitle');
	});
});
