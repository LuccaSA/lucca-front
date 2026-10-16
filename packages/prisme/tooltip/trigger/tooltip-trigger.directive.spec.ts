import { OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { provideLocationMocks, SpyLocation } from '@angular/common/testing';
import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { config } from 'rxjs';
import { LuTooltipTriggerDirective } from './tooltip-trigger.directive';

@Component({
	selector: 'lu-tooltip-late-host',
	template: `<span luTooltip="Late tooltip">Late</span>`,
	imports: [LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LateHostComponent {}

/**
 * Creates the tooltip while the after-render hooks are running, which adds its sequence to the set
 * the runner is currently iterating: the sequence then starts at a later phase, with no value piped
 * from the phases that were already over.
 */
@Component({
	selector: 'lu-tooltip-late-creator',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LateCreatorComponent {
	readonly #viewContainerRef = inject(ViewContainerRef);

	constructor() {
		afterNextRender({
			write: () => {
				const ref = this.#viewContainerRef.createComponent(LateHostComponent);
				ref.changeDetectorRef.detectChanges();
			},
		});
	}
}

describe(LuTooltipTriggerDirective.name, () => {
	it('destroys a tooltip created while the after-render hooks were running', async () => {
		const fixture = TestBed.createComponent(LateCreatorComponent);
		await fixture.whenStable();
		await fixture.whenStable();

		expect(() => fixture.destroy()).not.toThrow();
	});
});

/**
 * A button (the delegate) wrapping a span that carries the directive and delegates to it, so
 * that "hover/focus the delegate" and "hover/focus the tooltipped element itself" can be
 * exercised as two different targets, the way a real ellipsis-inside-a-focusable-ancestor case
 * (chip, filter pill, sortable column header…) does.
 */
@Component({
	selector: 'lu-tooltip-delegate-host',
	template: `
		<button #delegate type="button">
			<span #inner luTooltip="Tip" [luTooltipTriggerAnchor]="triggerAnchor()">Text</span>
		</button>
	`,
	imports: [LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DelegateHostComponent implements OnInit {
	@ViewChild('delegate', { static: true }) delegateRef!: ElementRef<HTMLElement>;
	@ViewChild('inner', { static: true }) innerRef!: ElementRef<HTMLElement>;

	readonly triggerAnchor = signal<HTMLElement | null>(null);

	ngOnInit(): void {
		this.triggerAnchor.set(this.delegateRef.nativeElement);
	}
}

@Component({
	selector: 'lu-tooltip-plain-host',
	template: `<span luTooltip="Tip">Text</span>`,
	imports: [LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PlainHostComponent {}

@Component({
	selector: 'lu-tooltip-disabled-host',
	template: `<button #button type="button" luTooltip="Tip" [attr.disabled]="disabledAttribute()">Text</button>`,
	imports: [LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {
	@ViewChild('button', { static: true }) buttonRef!: ElementRef<HTMLButtonElement>;

	readonly disabled = signal(false);

	/**
	 * A browser blurs a focused element as soon as a binding disables it, inside the render.
	 * happy-dom does not, so the binding does it itself.
	 */
	disabledAttribute(): '' | null {
		if (!this.disabled()) {
			return null;
		}
		this.buttonRef.nativeElement.blur();
		return '';
	}
}

function directiveOf(fixture: ComponentFixture<unknown>): LuTooltipTriggerDirective {
	return fixture.debugElement.query(By.directive(LuTooltipTriggerDirective)).injector.get(LuTooltipTriggerDirective);
}

describe(`${LuTooltipTriggerDirective.name}: delegated trigger`, () => {
	let fixture: ComponentFixture<DelegateHostComponent>;
	let directive: LuTooltipTriggerDirective;

	beforeEach(() => {
		fixture = TestBed.createComponent(DelegateHostComponent);
		fixture.detectChanges();
		fixture.detectChanges();
		directive = directiveOf(fixture);
	});

	afterEach(() => {
		TestBed.inject(OverlayContainer).getContainerElement().remove();
	});

	it('opens on delegate mouseenter and closes on delegate mouseleave', fakeAsync(() => {
		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(false);
	}));

	it('stays open when the pointer leaves the tooltipped element but is still within the delegate', fakeAsync(() => {
		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		// A real pointer move from the inner span to padding still inside the delegate button fires
		// a mouseleave on the span (its own, smaller bounds were exited) without one firing on the
		// delegate (the pointer never left it). Since listeners now live on the resolved trigger only
		// (the delegate here), this must be a no-op instead of closing the tooltip.
		fixture.componentInstance.innerRef.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);
	}));

	it('opens on delegate focus and closes on delegate blur', fakeAsync(() => {
		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new FocusEvent('focus'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new FocusEvent('blur'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(false);
	}));

	it('dismisses on Escape dispatched at the delegate', fakeAsync(() => {
		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(false);
	}));

	it('does not put the tooltipped element itself in the tab order', () => {
		expect(fixture.componentInstance.innerRef.nativeElement.hasAttribute('tabindex')).toBe(false);
	});

	it('stops reacting to the previous delegate once the delegate trigger input changes', fakeAsync(() => {
		const otherDelegate = document.createElement('button');

		fixture.componentInstance.triggerAnchor.set(otherDelegate);
		fixture.detectChanges();
		tick();

		fixture.componentInstance.delegateRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBeFalsy();

		otherDelegate.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);
	}));
});

describe(`${LuTooltipTriggerDirective.name}: without a delegated trigger`, () => {
	afterEach(() => {
		TestBed.inject(OverlayContainer).getContainerElement().remove();
	});

	it('makes the tooltipped element itself focusable and drives open/close from its own events', fakeAsync(() => {
		const fixture = TestBed.createComponent(PlainHostComponent);
		fixture.detectChanges();
		const directive = directiveOf(fixture);
		const host = fixture.nativeElement.querySelector('span') as HTMLElement;

		expect(host.getAttribute('tabindex')).toBe('0');

		host.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		host.dispatchEvent(new MouseEvent('mouseleave'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(false);
	}));
});

describe(`${LuTooltipTriggerDirective.name}: history navigation`, () => {
	const unhandledErrors = vi.fn();

	beforeEach(() => {
		config.onUnhandledError = unhandledErrors;
		TestBed.configureTestingModule({ providers: [provideLocationMocks()] });
	});

	afterEach(() => {
		config.onUnhandledError = null;
		unhandledErrors.mockReset();
		TestBed.inject(OverlayContainer).getContainerElement().remove();
	});

	it('opens again after a history navigation disposed the displayed tooltip', fakeAsync(() => {
		const fixture = TestBed.createComponent(PlainHostComponent);
		fixture.detectChanges();
		const directive = directiveOf(fixture);
		const host = fixture.nativeElement.querySelector('span') as HTMLElement;

		host.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		// Browser back/forward while the tooltip is displayed: the CDK disposes its overlay (`disposeOnNavigation`)
		(TestBed.inject(Location) as SpyLocation).simulateUrlPop('/previous');
		expect(directive.overlayRef).toBeUndefined();
		host.dispatchEvent(new MouseEvent('mouseleave'));
		tick(150);

		host.dispatchEvent(new MouseEvent('mouseenter'));
		tick(150);
		expect(unhandledErrors).not.toHaveBeenCalled();
		expect(directive.overlayRef?.hasAttached()).toBe(true);
		expect(directive.overlayRef?.overlayElement.id).toBe(host.getAttribute('aria-describedby'));
	}));
});

describe(`${LuTooltipTriggerDirective.name}: trigger disabled while focused`, () => {
	afterEach(() => {
		TestBed.inject(OverlayContainer).getContainerElement().remove();
	});

	it('closes without writing to a signal during the render when the trigger loses the focus', fakeAsync(() => {
		const fixture = TestBed.createComponent(DisabledHostComponent);
		fixture.detectChanges();
		const directive = directiveOf(fixture);
		const host = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

		host.focus();
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(true);

		fixture.componentInstance.disabled.set(true);
		expect(() => fixture.detectChanges()).not.toThrow();
		tick(150);
		expect(directive.overlayRef?.hasAttached()).toBe(false);
	}));
});
