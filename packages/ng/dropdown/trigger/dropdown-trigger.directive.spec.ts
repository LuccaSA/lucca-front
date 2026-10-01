import { ConnectedPosition, ConnectionPositionPair, FlexibleConnectedPositionStrategy, OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, input, TemplateRef, Type, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ALuPopoverPanel, LuPopoverAlignment } from '@lucca-front/ng/popover';
import { PopoverPosition } from '@lucca-front/ng/popover2';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { LuDropdownTriggerDirective } from './dropdown-trigger.directive';

@Component({
	selector: 'lu-dropdown-trigger-test-content',
	template: 'Component content',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DropdownTriggerTestContentComponent {}

@Component({
	selector: 'lu-dropdown-trigger-test-panel',
	template: '<ng-template>Legacy panel content</ng-template>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DropdownTriggerTestPanelComponent extends ALuPopoverPanel {
	readonly tpl = viewChild.required(TemplateRef);

	override get templateRef(): TemplateRef<unknown> {
		return this.tpl();
	}

	override close = new Subject<void>();
	override open = new Subject<void>();

	_emitCloseEvent(): void {}
	_emitOpenEvent(): void {}
	_emitHoveredEvent(): void {}
}

type PanelKind = 'template' | 'component' | 'legacyPanel';

@Component({
	selector: 'lu-dropdown-trigger-test',
	imports: [LuDropdownTriggerDirective, DropdownTriggerTestPanelComponent],
	template: `
		<button
			type="button"
			[luDropdown]="panelKind() === 'template' ? contentTpl : panelKind() === 'component' ? contentComponent : legacyPanel"
			[luDropdownPosition]="position()"
			[luDropdownDisabled]="disabled()"
			[customPositions]="customPositions()"
			(luDropdownOnOpen)="openedCount = openedCount + 1"
			(luDropdownOnClose)="closedCount = closedCount + 1"
		>
			Trigger
		</button>
		<ng-template #contentTpl>Template content</ng-template>
		<lu-dropdown-trigger-test-panel #legacyPanel />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DropdownTriggerTestComponent {
	readonly panelKind = input<PanelKind>('template');
	readonly position = input<PopoverPosition | null>(null);
	readonly disabled = input(false);
	readonly customPositions = input<ConnectionPositionPair[] | null>(null);

	readonly legacyPanel = viewChild.required(DropdownTriggerTestPanelComponent);

	readonly contentComponent: Type<unknown> = DropdownTriggerTestContentComponent;

	openedCount = 0;
	closedCount = 0;
}

describe(LuDropdownTriggerDirective.name, () => {
	let fixture: ComponentFixture<DropdownTriggerTestComponent>;
	let host: DropdownTriggerTestComponent;
	let directive: LuDropdownTriggerDirective<unknown>;
	let triggerElement: HTMLButtonElement;
	let overlayContainer: HTMLElement;

	const setup = (inputs: Partial<Record<'panelKind' | 'position' | 'disabled' | 'customPositions', unknown>> = {}) => {
		Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
		fixture.detectChanges();
		const triggerDebugElement = fixture.debugElement.query(By.directive(LuDropdownTriggerDirective));
		triggerElement = triggerDebugElement.nativeElement as HTMLButtonElement;
		directive = triggerDebugElement.injector.get(LuDropdownTriggerDirective);
	};

	const open = () => {
		triggerElement.click();
		fixture.detectChanges();
	};

	const getPopover = () => overlayContainer.querySelector<HTMLElement>('lu-popover-content');

	/** Positions given to the overlay on the last opening. */
	const spyOnPositions = () => {
		const withPositions = vi.spyOn(FlexibleConnectedPositionStrategy.prototype, 'withPositions');
		return () => withPositions.mock.lastCall?.[0] as ConnectedPosition[];
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [DropdownTriggerTestComponent],
		});

		fixture = TestBed.createComponent(DropdownTriggerTestComponent);
		host = fixture.componentInstance;
		overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
	});

	afterEach(() => {
		overlayContainer.remove();
	});

	describe('panel content', () => {
		it.each<[PanelKind, string]>([
			['template', 'Template content'],
			['component', 'Component content'],
			['legacyPanel', 'Legacy panel content'],
		])('should display a %s given as luDropdown', (panelKind, expectedContent) => {
			// Arrange
			setup({ panelKind });
			// Act
			open();
			// Assert
			expect(getPopover()?.textContent).toContain(expectedContent);
		});

		it('should close the dropdown when the legacy panel emits close', () => {
			// Arrange
			setup({ panelKind: 'legacyPanel' });
			open();
			// Act
			host.legacyPanel().close.next();
			fixture.detectChanges();
			// Assert
			expect(getPopover()).toBeNull();
			expect(host.closedCount).toBe(1);
		});

		it('should not display a close button', () => {
			// Arrange
			setup();
			// Act
			open();
			// Assert
			expect(overlayContainer.querySelector('.popover-close')).toBeNull();
		});
	});

	describe('popover bindings', () => {
		it('should reflect the opened state with aria-expanded', () => {
			// Arrange
			setup();
			const expandedBefore = triggerElement.getAttribute('aria-expanded');
			// Act
			open();
			// Assert
			expect(expandedBefore).toBe('false');
			expect(triggerElement.getAttribute('aria-expanded')).toBe('true');
		});

		it('should emit luDropdownOnOpen and luDropdownOnClose', () => {
			// Arrange
			setup();
			// Act
			open();
			open();
			// Assert
			expect(host.openedCount).toBe(1);
			expect(host.closedCount).toBe(1);
		});

		it('should not open when luDropdownDisabled is set', () => {
			// Arrange
			setup({ disabled: true });
			// Act
			open();
			// Assert
			expect(getPopover()).toBeNull();
			expect(host.openedCount).toBe(0);
		});
	});

	describe('positions', () => {
		it('should open below the trigger, aligned on its end, by default', () => {
			// Arrange
			const getPositions = spyOnPositions();
			setup();
			// Act
			open();
			// Assert
			expect(getPositions()).toEqual([
				{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
				{ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
				{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
				{ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
			]);
		});

		it.each<[PopoverPosition, ConnectedPosition]>([
			['above', { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }],
			['below', { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' }],
			['before', { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' }],
			['after', { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' }],
		])('should prefer the %s position given with luDropdownPosition', (position, expectedPreferredPosition) => {
			// Arrange
			const getPositions = spyOnPositions();
			setup({ position });
			// Act
			open();
			// Assert
			expect(getPositions()[0]).toEqual(expectedPreferredPosition);
		});

		it('should fall back on the horizontally mirrored position for a side position', () => {
			// Arrange
			const getPositions = spyOnPositions();
			setup({ position: 'after' });
			// Act
			open();
			// Assert
			expect(getPositions()).toEqual([
				{ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
				{ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
				{ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
				{ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
			]);
		});

		it.each<[LuPopoverAlignment, ConnectedPosition]>([
			['left', { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' }],
			['right', { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }],
			['center', { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' }],
		])('should align the panel on the %s of the trigger with luDropdownAlignment', (alignment, expectedPreferredPosition) => {
			// Arrange
			const getPositions = spyOnPositions();
			setup();
			directive.luDropdownAlignment = alignment;
			// Act: positions are computed when the position changes
			fixture.componentRef.setInput('position', 'above');
			fixture.detectChanges();
			open();
			// Assert
			expect(getPositions()[0]).toEqual(expectedPreferredPosition);
		});

		it('should align a side panel vertically with luDropdownAlignment', () => {
			// Arrange
			const getPositions = spyOnPositions();
			setup();
			directive.luDropdownAlignment = 'top';
			// Act
			fixture.componentRef.setInput('position', 'after');
			fixture.detectChanges();
			open();
			// Assert
			expect(getPositions()[0]).toEqual({ originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' });
		});
	});
});
