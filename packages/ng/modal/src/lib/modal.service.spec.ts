import { Component, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
	selector: 'lu-test-modal',
	standalone: true,
	template: `Content`,
})
export class ModalContentWithSubmitActionComponent implements ILuModalContent {
	title = 'OriginalTitle';

	submitAction() {
		return of(42);
	}
}

@Component({
	selector: 'lu-test-opener',
	template: `Content`,
})
export class ModalOpenerComponent {
	constructor(public modal: LuModal) {}
}

/**
 * Compiles when _input is of type T. Otherwise, throws a compile error.
 */
function assertOfType<T>(_input: T): void {
	return;
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

	it('should infer correct return type when submitAction exists', () => {
		const modal = spectator.inject(LuModal);
		const result$ = modal.open(ModalContentWithSubmitActionComponent).onClose;

		assertOfType<Observable<number>>(result$);
	});

	it('should infer correct return type when no submitAction', () => {
		const modal = spectator.inject(LuModal);
		const result$ = modal.open(ModalContentComponent).onClose;

		assertOfType<Observable<never>>(result$);
	});
});
