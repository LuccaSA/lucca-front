import { ConnectionPositionPair, FlexibleConnectedPositionStrategy, OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ElementRef, input, TemplateRef, Type, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { PopoverDirective, PopoverPosition } from './popover.directive';

@Component({
	selector: 'lu-popover-test-content',
	template: 'Component content',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverTestContentComponent {}

@Component({
	selector: 'lu-popover-test',
	imports: [PopoverDirective],
	template: `
		<button
			#triggerButton
			type="button"
			[luPopover2]="useComponent() ? contentComponent : withContent() ? contentTpl : undefined"
			[luPopoverTrigger]="trigger()"
			[luPopoverDisabled]="disabled()"
			[luPopoverNoCloseButton]="noCloseButton()"
			[luPopoverPosition]="position()"
			[customPositions]="customPositions()"
			[luPopoverOpenDelay]="openDelay()"
			[luPopoverCloseDelay]="closeDelay()"
			[luPopoverMaxBlockSize]="maxBlockSize()"
			[luPopoverIgnoredOutsidePointerTargets]="ignoreExternal() ? external : null"
			(luPopoverOpened)="openedCount = openedCount + 1"
			(luPopoverClosed)="closedCount = closedCount + 1"
		>
			Trigger
		</button>
		<button #external type="button">External control</button>
		<div #outside>Outside</div>
		<ng-template #contentTpl>Template content</ng-template>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverTestComponent {
	readonly trigger = input<'click' | 'click+hover' | 'hover+focus'>('click');
	readonly disabled = input(false);
	readonly noCloseButton = input(false);
	readonly withContent = input(true);
	readonly useComponent = input(false);
	readonly position = input<PopoverPosition | null>(null);
	readonly customPositions = input<ConnectionPositionPair[] | null>(null);
	readonly openDelay = input(300);
	readonly closeDelay = input(100);
	readonly maxBlockSize = input<string | null>(null);
	readonly ignoreExternal = input(false);

	readonly contentTpl = viewChild.required<TemplateRef<unknown>>('contentTpl');
	readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('triggerButton');
	readonly externalRef = viewChild.required<ElementRef<HTMLButtonElement>>('external');
	readonly outsideRef = viewChild.required<ElementRef<HTMLDivElement>>('outside');

	readonly contentComponent: Type<unknown> = PopoverTestContentComponent;

	openedCount = 0;
	closedCount = 0;
}

describe(PopoverDirective.name, () => {
	let fixture: ComponentFixture<PopoverTestComponent>;
	let host: PopoverTestComponent;
	let directive: PopoverDirective;
	let triggerElement: HTMLButtonElement;
	let overlayContainer: HTMLElement;

	const setup = (inputs: Partial<Record<keyof PopoverTestComponent, unknown>> = {}) => {
		Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
		fixture.detectChanges();
		triggerElement = host.triggerRef().nativeElement;
		directive = fixture.debugElement.query(By.directive(PopoverDirective)).injector.get(PopoverDirective);
	};

	const getPopover = () => overlayContainer.querySelector<HTMLElement>('lu-popover-content');
	const getCloseButton = () => overlayContainer.querySelector<HTMLButtonElement>('.popover-close');

	/** Mimics a real pointer interaction, which the CDK outside-click dispatcher listens to. */
	const pointerClick = (target: HTMLElement) => {
		target.dispatchEvent(new Event('pointerdown', { bubbles: true }));
		target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PopoverTestComponent],
		});

		fixture = TestBed.createComponent(PopoverTestComponent);
		host = fixture.componentInstance;
		overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
	});

	afterEach(() => {
		overlayContainer.remove();
	});

	describe('accessibility attributes', () => {
		it('should set aria-expanded to false when closed', () => {
			// Act
			setup();
			// Assert
			expect(triggerElement.getAttribute('aria-expanded')).toBe('false');
		});

		it('should set aria-expanded to true when opened', () => {
			// Arrange
			setup();
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(triggerElement.getAttribute('aria-expanded')).toBe('true');
		});

		it('should point aria-controls to the popover content id', () => {
			// Arrange
			setup();
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(triggerElement.getAttribute('aria-controls')).toMatch(/^popover-content-\d+$/);
			expect(getPopover()?.id).toBe(triggerElement.getAttribute('aria-controls'));
		});

		it('should not set aria-controls before the popover is opened', () => {
			// Act
			setup();
			// Assert
			expect(triggerElement.hasAttribute('aria-controls')).toBe(false);
		});

		it('should remove aria-controls once the popover is closed', () => {
			// Arrange
			setup();
			triggerElement.click();
			fixture.detectChanges();
			// Act
			directive.close();
			fixture.detectChanges();
			// Assert
			expect(getPopover()).toBeNull();
			expect(triggerElement.hasAttribute('aria-controls')).toBe(false);
		});
	});

	describe('click trigger', () => {
		it('should open the popover with its template content on click', () => {
			// Arrange
			setup();
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(true);
			expect(getPopover()?.textContent).toContain('Template content');
			expect(host.openedCount).toBe(1);
		});

		it('should render a component given as content', () => {
			// Arrange
			setup({ useComponent: true });
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(getPopover()?.textContent).toContain('Component content');
		});

		it('should close the popover on a second click', () => {
			// Arrange
			setup();
			pointerClick(triggerElement);
			fixture.detectChanges();
			// Act
			pointerClick(triggerElement);
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(getPopover()).toBeNull();
			expect(host.openedCount).toBe(1);
			expect(host.closedCount).toBe(1);
		});

		it('should not open when disabled', () => {
			// Arrange
			setup({ disabled: true });
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(getPopover()).toBeNull();
			expect(host.openedCount).toBe(0);
		});

		it('should not open without content', () => {
			// Arrange
			setup({ withContent: false });
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(getPopover()).toBeNull();
		});

		it('should not open on mouseenter', fakeAsync(() => {
			// Arrange
			setup();
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(1000);
			// Assert
			expect(directive.opened()).toBe(false);
		}));
	});

	describe('closing', () => {
		beforeEach(() => {
			setup();
			triggerElement.click();
			fixture.detectChanges();
		});

		it('should close and focus the trigger back when clicking the close button', () => {
			// Act
			getCloseButton()!.click();
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(getPopover()).toBeNull();
			expect(document.activeElement).toBe(triggerElement);
			expect(host.closedCount).toBe(1);
		});

		it('should close on Escape', () => {
			// Act
			window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(getPopover()).toBeNull();
		});

		it('should close when calling close()', () => {
			// Act
			directive.close();
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(host.closedCount).toBe(1);
		});

		it('should close on a pointer interaction outside the popover', () => {
			// Act
			pointerClick(host.outsideRef().nativeElement);
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
			expect(getPopover()).toBeNull();
		});

		it('should stay open on a pointer interaction inside the popover', () => {
			// Act
			pointerClick(overlayContainer.querySelector<HTMLElement>('.popover-content')!);
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(true);
		});

		it('should close when the host is destroyed', () => {
			// Act
			fixture.destroy();
			// Assert
			expect(getPopover()).toBeNull();
		});
	});

	describe('luPopoverIgnoredOutsidePointerTargets', () => {
		it('should close on a pointer interaction on an external control by default', () => {
			// Arrange
			setup();
			triggerElement.click();
			fixture.detectChanges();
			// Act
			pointerClick(host.externalRef().nativeElement);
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(false);
		});

		it('should stay open on a pointer interaction on an ignored external control', () => {
			// Arrange
			setup({ ignoreExternal: true });
			triggerElement.click();
			fixture.detectChanges();
			// Act
			pointerClick(host.externalRef().nativeElement);
			fixture.detectChanges();
			// Assert
			expect(directive.opened()).toBe(true);
		});
	});

	describe('popover content options', () => {
		it('should display a close button by default', () => {
			// Arrange
			setup();
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(getCloseButton()).not.toBeNull();
		});

		it('should not display a close button with luPopoverNoCloseButton', () => {
			// Arrange
			setup({ noCloseButton: true });
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(getCloseButton()).toBeNull();
		});

		it('should apply luPopoverMaxBlockSize to the popover', () => {
			// Arrange
			setup({ maxBlockSize: '200px' });
			// Act
			triggerElement.click();
			fixture.detectChanges();
			// Assert
			expect(overlayContainer.querySelector<HTMLElement>('.popover')!.style.getPropertyValue('--components-popover-content-maxBlockSize')).toBe('200px');
		});
	});

	describe('positions', () => {
		const positionsOf = (spy: ReturnType<typeof vi.spyOn>) => spy.mock.calls[0][0] as ConnectionPositionPair[];

		it('should prefer the above position, then its opposite, then the remaining ones by default', () => {
			// Arrange
			const withPositions = vi.spyOn(FlexibleConnectedPositionStrategy.prototype, 'withPositions');
			setup();
			// Act
			triggerElement.click();
			// Assert
			expect(positionsOf(withPositions)).toEqual([directive.positionPairs.above, directive.positionPairs.below, directive.positionPairs.before, directive.positionPairs.after]);
		});

		it('should prefer the luPopoverPosition, then its opposite, then the remaining ones', () => {
			// Arrange
			const withPositions = vi.spyOn(FlexibleConnectedPositionStrategy.prototype, 'withPositions');
			setup({ position: 'after' });
			// Act
			triggerElement.click();
			// Assert
			expect(positionsOf(withPositions)).toEqual([directive.positionPairs.after, directive.positionPairs.before, directive.positionPairs.above, directive.positionPairs.below]);
		});

		it('should use customPositions when provided', () => {
			// Arrange
			const withPositions = vi.spyOn(FlexibleConnectedPositionStrategy.prototype, 'withPositions');
			const customPositions = [new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })];
			setup({ customPositions });
			// Act
			triggerElement.click();
			// Assert
			expect(positionsOf(withPositions)).toEqual(customPositions);
		});
	});

	describe('hover trigger', () => {
		it('should open after the open delay on mouseenter', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover' });
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(299);
			const openedBeforeDelay = directive.opened();
			tick(1);
			// Assert
			expect(openedBeforeDelay).toBe(false);
			expect(directive.opened()).toBe(true);
		}));

		it('should close after the close delay on mouseleave', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover' });
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(300);
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseleave'));
			tick(99);
			const openedBeforeDelay = directive.opened();
			tick(1);
			// Assert
			expect(openedBeforeDelay).toBe(true);
			expect(directive.opened()).toBe(false);
		}));

		it('should use custom open and close delays', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover', openDelay: 50, closeDelay: 20 });
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(50);
			const openedAfterOpenDelay = directive.opened();
			triggerElement.dispatchEvent(new MouseEvent('mouseleave'));
			tick(20);
			// Assert
			expect(openedAfterOpenDelay).toBe(true);
			expect(directive.opened()).toBe(false);
		}));

		it('should not open when the pointer leaves before the open delay', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover' });
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(100);
			triggerElement.dispatchEvent(new MouseEvent('mouseleave'));
			tick(1000);
			// Assert
			expect(directive.opened()).toBe(false);
		}));

		it('should stay open when the pointer moves from the trigger to the popover', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover' });
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(300);
			fixture.detectChanges();
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseleave'));
			tick(50);
			getPopover()!.dispatchEvent(new MouseEvent('mouseenter'));
			tick(1000);
			// Assert
			expect(directive.opened()).toBe(true);
		}));

		it('should close after the close delay when the pointer leaves the popover', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover' });
			triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
			tick(300);
			fixture.detectChanges();
			// Act
			getPopover()!.dispatchEvent(new MouseEvent('mouseleave'));
			tick(100);
			// Assert
			expect(directive.opened()).toBe(false);
		}));

		it('should not close on mouseleave when opened by a click', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'click+hover' });
			triggerElement.click();
			// Act
			triggerElement.dispatchEvent(new MouseEvent('mouseleave'));
			tick(1000);
			// Assert
			expect(directive.opened()).toBe(true);
		}));
	});

	describe('focus trigger', () => {
		it('should open after the open delay on focus', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'hover+focus' });
			// Act
			triggerElement.dispatchEvent(new FocusEvent('focus'));
			tick(300);
			// Assert
			expect(directive.opened()).toBe(true);
		}));

		it('should not open on focus with the click trigger', fakeAsync(() => {
			// Arrange
			setup();
			// Act
			triggerElement.dispatchEvent(new FocusEvent('focus'));
			tick(1000);
			// Assert
			expect(directive.opened()).toBe(false);
		}));

		it('should add a screen reader description to the trigger when opened on focus', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'hover+focus' });
			// Act
			triggerElement.dispatchEvent(new FocusEvent('focus'));
			tick(300);
			// Assert
			const description = triggerElement.querySelector('.pr-u-mask');
			expect(description?.textContent).toBe('(Tab key to enter panel.)');
		}));

		it('should remove the screen reader description on close', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'hover+focus' });
			triggerElement.dispatchEvent(new FocusEvent('focus'));
			tick(300);
			// Act
			directive.close();
			// Assert
			expect(triggerElement.querySelector('.pr-u-mask')).toBeNull();
		}));

		it('should close on Shift+Tab from the trigger', fakeAsync(() => {
			// Arrange
			setup({ trigger: 'hover+focus' });
			triggerElement.dispatchEvent(new FocusEvent('focus'));
			tick(300);
			// Act
			triggerElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
			// Assert
			expect(directive.opened()).toBe(false);
		}));

		it('should not close on Shift+Tab with the click trigger', () => {
			// Arrange
			setup();
			triggerElement.click();
			// Act
			triggerElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
			// Assert
			expect(directive.opened()).toBe(true);
		});
	});

	describe('keyboard navigation', () => {
		// happy-dom has no layout, so the CDK focus trap considers every element as non-focusable:
		// where the focus lands can only be checked in a real browser.
		it('should take over the Tab key when opened', () => {
			// Arrange
			setup();
			triggerElement.click();
			fixture.detectChanges();
			const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
			// Act
			triggerElement.dispatchEvent(event);
			// Assert
			expect(event.defaultPrevented).toBe(true);
		});

		it('should let the default Tab behavior happen when closed', () => {
			// Arrange
			setup();
			const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
			// Act
			triggerElement.dispatchEvent(event);
			// Assert
			expect(event.defaultPrevented).toBe(false);
		});
	});
});
