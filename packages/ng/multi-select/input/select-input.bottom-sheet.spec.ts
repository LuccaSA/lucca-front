import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { vi } from 'vitest';
import { LuMultiSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

const options: Entity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
];

/**
 * The select observes `injectMediaMinBreakpoint('S', true)`, which matches while the viewport is *below*
 * the S breakpoint, so this single subject drives bottom sheet mode.
 */
class FakeBreakpointObserver {
	readonly belowSmallBreakpoint = new BehaviorSubject(false);

	observe(): Observable<BreakpointState> {
		return this.belowSmallBreakpoint.pipe(map((matches) => ({ matches, breakpoints: {} })));
	}

	isMatched(): boolean {
		return this.belowSmallBreakpoint.value;
	}
}

@Component({
	selector: 'lu-multi-select-bottom-sheet-host',
	imports: [FormsModule, LuMultiSelectInputComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Options">
			<lu-multi-select [ngModel]="selected" [options]="options" />
		</lu-form-field>
	`,
})
class HostComponent {
	selected: Entity[] = [];

	options: Entity[] = options;
}

describe(`${LuMultiSelectInputComponent.name} bottom sheet`, () => {
	let breakpointObserver: FakeBreakpointObserver;

	beforeEach(() => {
		breakpointObserver = new FakeBreakpointObserver();
		TestBed.configureTestingModule({
			providers: [{ provide: BreakpointObserver, useValue: breakpointObserver }],
		});
	});

	function createSelect(belowSmallBreakpoint: boolean): { fixture: ComponentFixture<HostComponent>; select: LuMultiSelectInputComponent<Entity> } {
		breakpointObserver.belowSmallBreakpoint.next(belowSmallBreakpoint);
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		const select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance as LuMultiSelectInputComponent<Entity>;
		return { fixture, select };
	}

	describe('overlay', () => {
		it('should pin the panel to the bottom of the viewport below the S breakpoint', () => {
			// Arrange
			const { select } = createSelect(true);

			// Act
			select.openPanel();

			// Assert
			expect(document.querySelector('.cdk-overlay-pane')).toHaveClass('mod-bottomSheet');
			expect(document.querySelector('.cdk-overlay-dark-backdrop')).not.toBeNull();
		});

		it('should keep anchoring the panel to the field above the S breakpoint', () => {
			// Arrange
			const { select } = createSelect(false);

			// Act
			select.openPanel();

			// Assert
			expect(document.querySelector('.cdk-overlay-pane')).not.toHaveClass('mod-bottomSheet');
			expect(document.querySelector('.cdk-overlay-dark-backdrop')).toBeNull();
		});
	});

	describe('focus', () => {
		it('should not send focus back to the covered displayer below the S breakpoint', () => {
			// Arrange
			const { select } = createSelect(true);
			const focusRequest = vi.spyOn(select.focusInput$, 'next');

			// Act — this runs after every selection, and would steal focus from the sheet's own search input
			select.focusInput();

			// Assert
			expect(focusRequest).not.toHaveBeenCalled();
		});

		it('should send focus to the displayer above the S breakpoint', () => {
			// Arrange
			const { select } = createSelect(false);
			const focusRequest = vi.spyOn(select.focusInput$, 'next');

			// Act
			select.focusInput();

			// Assert
			expect(focusRequest).toHaveBeenCalledWith({ keepClue: true });
		});
	});

	describe('sheet header', () => {
		function panel(): HTMLElement | null {
			return document.querySelector<HTMLElement>('.lu-picker-panel');
		}

		it('should mark the sheet as a modal dialog named after the field, with its own search input', () => {
			// Arrange
			const { fixture, select } = createSelect(true);

			// Act
			select.openPanel();
			fixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();

			// Assert
			expect(panel()).toHaveAttribute('role', 'dialog');
			expect(panel()).toHaveAttribute('aria-modal', 'true');
			expect(panel()).toHaveAttribute('aria-label', 'Options');
			expect(panel()?.querySelector('.textField-input-value')).toHaveAttribute('cdkFocusInitial');
		});

		it('should not render a header above the S breakpoint', () => {
			// Arrange
			const { fixture, select } = createSelect(false);

			// Act
			select.openPanel();
			fixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();

			// Assert
			expect(panel()).not.toBeNull();
			expect(panel()).not.toHaveAttribute('role', 'dialog');
			expect(panel()?.querySelector('.lu-picker-header')).toBeNull();
		});
	});
});
