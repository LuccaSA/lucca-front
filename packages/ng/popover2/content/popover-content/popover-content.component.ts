import { CdkObserveContent } from '@angular/cdk/observers';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, Injector, input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { filter, Subject } from 'rxjs';
import { PopoverFocusTrap } from '../../popover-focus-trap';
import { POPOVER_CONFIG } from '../../popover-tokens';
import { LU_POPOVER2_TRANSLATIONS } from '../../popover.translate';

@Component({
	selector: 'lu-popover-content',
	imports: [ButtonComponent, IconComponent, CdkObserveContent, PortalDirective],
	templateUrl: './popover-content.component.html',
	styleUrl: './popover-content.component.scss',
	host: {
		'[attr.id]': 'contentId',
		'(mouseenter)': 'mouseEnter()',
		'(mouseleave)': 'mouseLeave()',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent implements AfterViewInit, OnDestroy {
	readonly intl = input(...intlInputOptions(LU_POPOVER2_TRANSLATIONS));

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly config = inject(POPOVER_CONFIG);

	readonly destroyRef = inject(DestroyRef);

	contentId = this.config.contentId;

	content = this.config.content;

	#focusManager = new PopoverFocusTrap(this.#elementRef.nativeElement, this.config.triggerElement, inject(Injector));

	readonly closed$ = new Subject<void>();

	contentChangedDebounceTime = 100;

	readonly mouseEnter$ = new Subject<void>();

	mouseEnter(): void {
		this.mouseEnter$.next();
	}

	readonly mouseLeave$ = new Subject<void>();

	mouseLeave(): void {
		this.mouseLeave$.next();
	}

	constructor() {
		// Escape is routed by CDK's keyboard dispatcher rather than listened to on `window`, so only the
		// topmost overlay reacts to it: a select panel, a dialog or a bottom sheet opened from inside the
		// popover consumes its own Escape, and the popover no longer closes underneath it.
		this.config.ref
			.keydownEvents()
			.pipe(
				filter((event) => event.key === 'Escape'),
				takeUntilDestroyed(),
			)
			.subscribe(() => this.close());
	}

	contentChanged() {
		this.config.ref.updatePosition();
	}

	ngOnDestroy(): void {
		this.#destroyEvents();
		this.#focusManager.destroy();
	}

	ngAfterViewInit(): void {
		this.#focusManager.attachAnchors();
		if (!this.config.disableCloseButtonFocus) {
			void this.#focusManager.focusInitialElementWhenReady();
		}
	}

	grabFocus(): void {
		this.#focusManager.focusInitialElement();
	}

	close(): void {
		if (!this.config.disableInitialTriggerFocus) {
			// Focus initial trigger element
			this.config.triggerElement.focus();
		}
		// Tell the directive we're closed now
		this.#destroyEvents();
		// Detach overlay
		this.config.ref.dispose();
	}

	#destroyEvents(): void {
		this.closed$.next();
		this.closed$.complete();
		this.mouseEnter$.complete();
		this.mouseLeave$.complete();
	}
}
