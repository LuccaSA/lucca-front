import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ILuModalContent } from './modal.model';
import { provideLuModal } from './modal.module';
import { LuModal } from './modal.service';

@Component({
	selector: 'lu-modal-content-test',
	template: `<p>content</p>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ModalContentTestComponent implements ILuModalContent<string> {
	title = 'Modal title';
	submitLabel = of('Save');
	cancelLabel = 'Nope';

	submitAction(): string {
		return 'submitted';
	}
}

@Component({
	selector: 'lu-modal-host-test',
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ModalHostTestComponent {}

describe(LuModal.name, () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [OverlayModule, DialogModule],
			providers: [provideLuModal()],
		});
	});

	it('should render the header and footer of an ILuModalContent modal', () => {
		const fixture = TestBed.createComponent(ModalHostTestComponent);
		fixture.detectChanges();

		TestBed.inject(LuModal).open(ModalContentTestComponent);
		fixture.detectChanges();

		const dialog = document.querySelector('.dialog');
		expect(dialog).not.toBeNull();
		assert(dialog !== null);
		// Regression guard: the header/footer observables must not error on the replayed `ngDoCheck`
		// emitted before the content component instance exists, otherwise those slots stay empty.
		expect(dialog.querySelector('h1')?.textContent?.trim()).toBe('Modal title');

		const buttons = Array.from(dialog.querySelectorAll('button')).map((button) => button.textContent?.trim());
		expect(buttons).toContain('Save');
		expect(buttons).toContain('Nope');
	});

	it('should render the header and footer within a single change detection cycle, without an ExpressionChanged error', () => {
		const fixture = TestBed.createComponent(ModalHostTestComponent);
		fixture.detectChanges();

		TestBed.inject(LuModal).open(ModalContentTestComponent);

		// The content component is created in `ngAfterViewInit`, so its values reach the header/footer after the
		// view has been checked. `ApplicationRef.tick()` runs the dev-mode `checkNoChanges` over the overlay views,
		// which `fixture.detectChanges()` on the host does not reach.
		expect(() => TestBed.inject(ApplicationRef).tick()).not.toThrow();
		expect(document.querySelector('.dialog h1')?.textContent?.trim()).toBe('Modal title');
	});
});
