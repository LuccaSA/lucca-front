import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { vi } from 'vitest';
import { LuSimpleSelectInputComponent } from './select-input.component';

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
	readonly observedQueries: string[] = [];

	observe(query: string | readonly string[]): Observable<BreakpointState> {
		this.observedQueries.push(...(typeof query === 'string' ? [query] : query));
		return this.belowSmallBreakpoint.pipe(map((matches) => ({ matches, breakpoints: {} })));
	}

	isMatched(): boolean {
		return this.belowSmallBreakpoint.value;
	}
}

@Component({
	selector: 'lu-simple-select-bare-host',
	imports: [FormsModule, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-simple-select [ngModel]="selected" [options]="options" /> `,
})
class BareHostComponent {
	selected: Entity | null = null;

	options: Entity[] = options;
}

@Component({
	selector: 'lu-simple-select-form-field-host',
	imports: [FormsModule, LuSimpleSelectInputComponent, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Country">
			<lu-simple-select [ngModel]="selected" [options]="options" />
		</lu-form-field>
	`,
})
class FormFieldHostComponent {
	selected: Entity | null = null;

	options: Entity[] = options;
}

@Component({
	selector: 'lu-simple-select-label-host',
	imports: [FormsModule, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<label>
			<span>Wrapping label</span>
			<span role="button">Additional info</span>
			<span class="pr-u-mask">screen reader only</span>
			<lu-simple-select [ngModel]="selected" [options]="options" />
		</label>
	`,
})
class LabelHostComponent {
	selected: Entity | null = null;

	options: Entity[] = options;
}

describe(`${LuSimpleSelectInputComponent.name} bottom sheet`, () => {
	let breakpointObserver: FakeBreakpointObserver;

	beforeEach(() => {
		breakpointObserver = new FakeBreakpointObserver();
		TestBed.configureTestingModule({
			providers: [{ provide: BreakpointObserver, useValue: breakpointObserver }],
		});
	});

	function createHost<THost>(host: new () => THost, belowSmallBreakpoint: boolean): ComponentFixture<THost> {
		breakpointObserver.belowSmallBreakpoint.next(belowSmallBreakpoint);
		const fixture = TestBed.createComponent(host);
		fixture.detectChanges();
		return fixture;
	}

	function selectOf(fixture: ComponentFixture<unknown>): LuSimpleSelectInputComponent<Entity> {
		return fixture.debugElement.query(By.directive(LuSimpleSelectInputComponent)).componentInstance as LuSimpleSelectInputComponent<Entity>;
	}

	describe('mode detection', () => {
		it('should watch the viewport for the S breakpoint', () => {
			// Act
			createHost(BareHostComponent, false);

			// Assert
			expect(breakpointObserver.observedQueries).toContain('not all and (min-width: 50em)');
		});

		it('should not use bottom sheet mode above the S breakpoint', () => {
			// Act
			const fixture = createHost(BareHostComponent, false);

			// Assert
			expect(selectOf(fixture).bottomSheetMode()).toBe(false);
		});

		it('should use bottom sheet mode below the S breakpoint', () => {
			// Act
			const fixture = createHost(BareHostComponent, true);

			// Assert
			expect(selectOf(fixture).bottomSheetMode()).toBe(true);
		});

		it('should not use bottom sheet mode in a filter pill, which brings its own overlay', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, true);
			const select = selectOf(fixture);

			// Act — a filter pill flips this flag as it takes the select over, before any panel is opened
			select.filterPillMode = true;

			// Assert
			expect(select.bottomSheetMode()).toBe(false);
		});
	});

	describe('panel title', () => {
		it('should use the label associated by the form field', () => {
			// Arrange
			const fixture = createHost(FormFieldHostComponent, true);
			const select = selectOf(fixture);

			// Act
			select.openPanel();

			// Assert
			expect(select.panelTitle()).toBe('Country');
		});

		it('should use the wrapping label without its adornments', () => {
			// Arrange
			const fixture = createHost(LabelHostComponent, true);
			const select = selectOf(fixture);

			// Act
			select.openPanel();

			// Assert
			expect(select.panelTitle()).toBe('Wrapping label');
		});

		it('should stay empty rather than echo the selected value when there is no label', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, true);
			const select = selectOf(fixture);
			select.writeValue(options[0]);
			fixture.detectChanges();

			// Act
			select.openPanel();

			// Assert
			expect(select.panelTitle()).toBe('');
		});
	});

	describe('overlay', () => {
		function pane(): HTMLElement | null {
			return document.querySelector<HTMLElement>('.cdk-overlay-pane');
		}

		it('should pin the panel to the bottom of the viewport below the S breakpoint', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, true);

			// Act
			selectOf(fixture).openPanel();

			// Assert
			expect(pane()).toHaveClass('mod-bottomSheet');
			expect(document.querySelector('.cdk-overlay-dark-backdrop')).not.toBeNull();
		});

		it('should keep anchoring the panel to the field above the S breakpoint', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, false);

			// Act
			selectOf(fixture).openPanel();

			// Assert
			expect(pane()).not.toHaveClass('mod-bottomSheet');
			expect(document.querySelector('.cdk-overlay-dark-backdrop')).toBeNull();
		});
	});

	describe('focus', () => {
		it('should not focus the covered field below the S breakpoint', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, true);
			const select = selectOf(fixture);
			const focusInput = vi.spyOn(select, 'focusInput');

			// Act
			select.openPanel();

			// Assert
			expect(focusInput).not.toHaveBeenCalled();
		});

		it('should focus the field above the S breakpoint', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, false);
			const select = selectOf(fixture);
			const focusInput = vi.spyOn(select, 'focusInput');

			// Act
			select.openPanel();

			// Assert
			expect(focusInput).toHaveBeenCalled();
		});

		it('should keep the sheet open on Tab, which cycles inside the modal surface', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, true);
			const select = selectOf(fixture);
			select.openPanel();

			// Act
			select.onKeyDownNavigation(new KeyboardEvent('keydown', { key: 'Tab' }));

			// Assert
			expect(select.isPanelOpen).toBe(true);
		});

		it('should close the panel on Tab above the S breakpoint', () => {
			// Arrange
			const fixture = createHost(BareHostComponent, false);
			const select = selectOf(fixture);
			select.openPanel();

			// Act
			select.onKeyDownNavigation(new KeyboardEvent('keydown', { key: 'Tab' }));

			// Assert
			expect(select.isPanelOpen).toBe(false);
		});
	});

	describe('sheet header', () => {
		function panel(): HTMLElement | null {
			return document.querySelector<HTMLElement>('.lu-picker-panel');
		}

		function openSheet(): void {
			const fixture = createHost(FormFieldHostComponent, true);
			selectOf(fixture).openPanel();
			fixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();
		}

		it('should mark the sheet as a modal dialog named after the field', () => {
			// Act
			openSheet();

			// Assert
			expect(panel()).toHaveAttribute('role', 'dialog');
			expect(panel()).toHaveAttribute('aria-modal', 'true');
			expect(panel()).toHaveAttribute('aria-label', 'Country');
		});

		it('should embed a search input that takes the initial focus', () => {
			// Act
			openSheet();

			// Assert
			const searchInput = panel()?.querySelector('.textField-input-value');
			expect(searchInput).not.toBeNull();
			expect(searchInput).toHaveAttribute('cdkFocusInitial');
		});

		it('should label its close button', () => {
			// Act
			openSheet();

			// Assert
			expect(panel()?.querySelector('.lu-picker-header-close')?.getAttribute('aria-label')).toBeTruthy();
		});

		it('should not render a header above the S breakpoint', () => {
			// Arrange
			const fixture = createHost(FormFieldHostComponent, false);

			// Act
			selectOf(fixture).openPanel();
			fixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();

			// Assert
			expect(panel()).not.toBeNull();
			expect(panel()).not.toHaveAttribute('role', 'dialog');
			expect(panel()?.querySelector('.lu-picker-header')).toBeNull();
		});
	});
});
