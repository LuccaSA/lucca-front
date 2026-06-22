import { ConnectedPosition, ConnectionPositionPair, FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
	booleanAttribute,
	DestroyRef,
	Directive,
	ElementRef,
	inject,
	Injector,
	input,
	InputSignal,
	linkedSignal,
	model,
	OnDestroy,
	output,
	Provider,
	Renderer2,
	signal,
	TemplateRef,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { intlInputOptions, isNotNil } from '@lucca-front/ng/core';
import { combineLatest, debounce, filter, map, merge, Subject, switchMap, take, timer } from 'rxjs';
import { PopoverContentComponent } from './content/popover-content/popover-content.component';
import { POPOVER_CONFIG, PopoverConfig } from './popover-tokens';
import { LU_POPOVER2_TRANSLATIONS } from './popover2.translate';

export type PopoverPosition = 'above' | 'below' | 'before' | 'after';

export interface PopoverOpenOptions {
	/** Prevents focusing the close button (or first focusable element) when the popover opens. */
	disableCloseButtonFocus?: boolean;
	/** Prevents giving the focus back to the trigger element when the popover closes. */
	disableInitialTriggerFocus?: boolean;
}

let nextId = 0;

const defaultPositionPairs: Record<PopoverPosition, ConnectionPositionPair> = {
	above: new ConnectionPositionPair(
		{ originX: 'center', originY: 'top' },
		{
			overlayX: 'center',
			overlayY: 'bottom',
		},
	),
	below: new ConnectionPositionPair(
		{ originX: 'center', originY: 'bottom' },
		{
			overlayX: 'center',
			overlayY: 'top',
		},
	),
	before: new ConnectionPositionPair(
		{ originX: 'start', originY: 'center' },
		{
			overlayX: 'end',
			overlayY: 'center',
		},
	),
	after: new ConnectionPositionPair(
		{ originX: 'end', originY: 'center' },
		{
			overlayX: 'start',
			overlayY: 'center',
		},
	),
};

@Directive({
	selector: '[luPopover2]',
	host: {
		'[attr.aria-expanded]': 'opened()',
		'[attr.aria-controls]': 'ariaControls',
		'(click)': 'onMouseClick()',
		'(mouseleave)': 'onMouseLeave()',
		'(focus)': 'onFocus()',
		'(mouseenter)': 'onMouseEnter()',
		'(keydown.Tab)': 'focusBackToContent($event)',
		'(keydown.Shift.Tab)': 'focusOutBefore()',
	},
	exportAs: 'luPopover2',
})
export class PopoverDirective implements OnDestroy {
	readonly overlay = inject(Overlay);

	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#vcr = inject(ViewContainerRef);

	#destroyRef = inject(DestroyRef);

	#renderer = inject(Renderer2);

	readonly intl = input(...intlInputOptions(LU_POPOVER2_TRANSLATIONS));

	readonly luPopover2 = input<TemplateRef<unknown> | Type<unknown>>();

	readonly luPopoverPosition = input<PopoverPosition | null>(null);

	readonly luPopoverMaxBlockSize = input<string | null>(null);

	readonly luPopoverMaxInlineSize = input<string | null>(null);

	readonly overlayScrollStrategy = input<'reposition' | 'block' | 'close'>('reposition');

	readonly luPopoverDisabledInput = input(false, { transform: booleanAttribute, alias: 'luPopoverDisabled' });

	readonly luPopoverTrigger = model<'click' | 'click+hover' | 'hover+focus'>('click');

	readonly customPositionsInput = input<ConnectionPositionPair[] | null>(null, { alias: 'customPositions' });

	/**
	 * Removes close button entirely, this is bad for a11y but sometimes we want it.
	 */
	readonly luPopoverNoCloseButtonInput = input(false, { transform: booleanAttribute, alias: 'luPopoverNoCloseButton' });

	/**
	 * Allows to anchor the popover to another element instead of the trigger one
	 * for placement purpose
	 */
	readonly luPopoverAnchor = input<FlexibleConnectedPositionStrategyOrigin>(this.elementRef);

	/**
	 * Extra element(s) to treat as "inside" the popover for outside-pointer detection. Pointer events
	 * originating from them won't close the popover. Useful when an external control opens the popover
	 * (e.g. an input opening it on focus) and clicking it again should not trigger a close-then-reopen.
	 */
	luPopoverIgnoredOutsidePointerTargets = input<HTMLElement | HTMLElement[] | null>(null);

	// We have to type these two for Compodoc to find the right type and tell Storybook these aren't strings
	readonly luPopoverOpenDelay: InputSignal<number> = input<number>(300);

	readonly luPopoverCloseDelay: InputSignal<number> = input<number>(100);

	readonly luPopoverPositionRef = linkedSignal(() => this.luPopoverPosition() || 'above');

	readonly open$ = new Subject<'focus' | 'click' | 'hover'>();

	readonly close$ = new Subject<void>();

	readonly luPopoverClosed = output<void>();

	readonly luPopoverOpened = output<void>();

	readonly content = linkedSignal(() => this.luPopover2());
	readonly luPopoverDisabled = linkedSignal(() => this.luPopoverDisabledInput());
	readonly customPositions = linkedSignal(() => this.customPositionsInput());
	readonly luPopoverNoCloseButton = linkedSignal(() => this.luPopoverNoCloseButtonInput());

	#listenToMouseLeave = false;
	#listenToMouseEnter = true;
	#skipNextFocus = false;

	#overlayRef: OverlayRef;

	#componentRef?: PopoverContentComponent;

	positionPairs: Record<PopoverPosition, ConnectionPositionPair> = defaultPositionPairs;

	readonly opened = signal(false);

	readonly ariaControls = `popover-content-${nextId++}`;

	#screenReaderDescription?: HTMLSpanElement;

	// For when we need to extend this popover and add some extra providers to the panel
	protected additionalProviders: Provider[] = [];

	constructor() {
		combineLatest([toObservable(this.luPopoverOpenDelay), toObservable(this.luPopoverCloseDelay), toObservable(this.luPopoverTrigger)])
			.pipe(
				filter(([, , trigger]) => {
					return trigger.includes('hover') || trigger.includes('focus');
				}),
				switchMap(([openDelay, closeDelay]) => {
					return merge(this.open$.pipe(map((type) => ['open', type])), this.close$.pipe(map(() => ['close']))).pipe(
						debounce(([event]) => {
							return timer(event === 'open' ? openDelay : closeDelay);
						}),
					);
				}),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe(([event, type]: ['open' | 'close', 'focus' | 'click' | 'hover']) => {
				if (event === 'open') {
					this.openPopover({ disableCloseButtonFocus: true, disableInitialTriggerFocus: type === 'hover' });
					this.#listenToMouseLeave = type !== 'click';
					if (type === 'focus' && !this.#screenReaderDescription) {
						this.#screenReaderDescription = this.#renderer.createElement('span') as HTMLSpanElement;
						this.#screenReaderDescription.innerText = this.intl().screenReaderDescription;
						this.#renderer.addClass(this.#screenReaderDescription, 'pr-u-mask');
						this.#renderer.appendChild(this.elementRef.nativeElement, this.#screenReaderDescription);
					}
				} else if (this.opened()) {
					this.#componentRef?.close();
					this.#listenToMouseEnter = true;
				}
			});
	}

	ngOnDestroy(): void {
		this.#componentRef?.close();
	}

	onMouseEnter() {
		if (this.#listenToMouseEnter && this.luPopoverTrigger().includes('hover')) {
			this.open$.next('hover');
			this.#listenToMouseLeave = true;
		}
	}

	onFocus() {
		if (this.luPopoverTrigger().includes('focus')) {
			if (this.#skipNextFocus) {
				this.#skipNextFocus = false;
			} else {
				this.open$.next('focus');
				this.#listenToMouseLeave = true;
				this.#skipNextFocus = true;
			}
		}
	}

	onMouseLeave() {
		if (this.#listenToMouseLeave && this.luPopoverTrigger().includes('hover')) {
			this.close$.next();
			this.#listenToMouseEnter = true;
		}
	}

	onMouseClick(): void {
		if (this.opened()) {
			this.#componentRef?.close();
			this.#listenToMouseLeave = true;
		} else {
			this.openPopover();
			this.#listenToMouseLeave = false;
			this.#listenToMouseEnter = false;
		}
	}

	close(): void {
		if (this.opened()) {
			this.#componentRef?.close();
			this.#listenToMouseLeave = true;
		}
	}

	openPopover(options?: PopoverOpenOptions): void;
	/**
	 * @deprecated The boolean signature is kept only for backward compatibility. `withBackdrop` is now ignored
	 * (the popover no longer creates a blocking backdrop). Prefer `openPopover({ disableCloseButtonFocus, disableInitialTriggerFocus })`.
	 */
	openPopover(withBackdrop?: boolean, disableCloseButtonFocus?: boolean, disableInitialTriggerFocus?: boolean): void;
	openPopover(optionsOrWithBackdrop?: PopoverOpenOptions | boolean, disableCloseButtonFocusArg?: boolean, disableInitialTriggerFocusArg?: boolean): void {
		// New options-object form vs deprecated boolean form. With the boolean form the first
		// positional argument is the now-ignored `withBackdrop`, so the focus flags shift by one.
		const options: PopoverOpenOptions =
			typeof optionsOrWithBackdrop === 'object' && optionsOrWithBackdrop !== null
				? optionsOrWithBackdrop
				: { disableCloseButtonFocus: disableCloseButtonFocusArg, disableInitialTriggerFocus: disableInitialTriggerFocusArg };
		const disableCloseButtonFocus = options.disableCloseButtonFocus ?? false;
		const disableInitialTriggerFocus = options.disableInitialTriggerFocus ?? false;
		const content = this.content();

		if (!this.opened() && !this.luPopoverDisabled() && isNotNil(content)) {
			this.opened.set(true);
			this.luPopoverOpened.emit();
			this.#overlayRef = this.overlay.create({
				positionStrategy: this.overlay
					.position()
					.flexibleConnectedTo(this.luPopoverAnchor())
					.withPositions(this.customPositions() || this.#buildPositions()),
				scrollStrategy: this.overlay.scrollStrategies[this.overlayScrollStrategy() ?? 'reposition'](),
				disposeOnNavigation: true,
			});
			// Close on outside interaction WITHOUT a blocking backdrop that would
			// intercept pointer events on the rest of the page.
			this.#overlayRef
				.outsidePointerEvents()
				.pipe(takeUntilDestroyed(this.#destroyRef))
				.subscribe((event) => {
					// Re-opening from the trigger (or from the anchor element, which may be a wrapper
					// containing other interactive parts), as well as from explicitly ignored external
					// controls, is handled by their own open handlers (e.g. the click() HostListener or
					// an input opening on focus). Ignore those here, otherwise we'd close on pointerdown
					// then immediately reopen on click.
					const target = event.target;
					if (target instanceof Node && (this.elementRef.nativeElement.contains(target) || this.#anchorElement?.contains(target) || this.#isIgnoredOutsidePointerTarget(target))) {
						return;
					}
					this.#componentRef?.close();
					this.#listenToMouseLeave = true;
				});
			const config: PopoverConfig = {
				content: content,
				ref: this.#overlayRef,
				contentId: this.ariaControls,
				triggerElement: this.elementRef.nativeElement,
				maxBlockSize: this.luPopoverMaxBlockSize(),
				maxInlineSize: this.luPopoverMaxInlineSize(),
				disableCloseButtonFocus: disableCloseButtonFocus,
				disableInitialTriggerFocus: disableInitialTriggerFocus,
				noCloseButton: this.luPopoverNoCloseButton(),
			};
			this.#componentRef = this.#overlayRef.attach(
				new ComponentPortal(
					PopoverContentComponent,
					this.#vcr,
					Injector.create({
						providers: [{ provide: POPOVER_CONFIG, useValue: config }, { provide: PopoverContentComponent, useValue: this.#componentRef }, ...this.additionalProviders],
					}),
				),
			).instance;
			// On tooltip leave => trigger close
			this.#componentRef.mouseLeave$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.close$.next());
			// On tooltip enter => trigger open to keep it opened
			this.#componentRef.mouseEnter$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.open$.next('hover'));
			this.#componentRef.closed$.pipe(take(1), takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
				this.opened.set(false);
				this.#skipNextFocus = false;
				this.luPopoverClosed.emit();
				this.#listenToMouseLeave = false;
				if (this.#screenReaderDescription) {
					this.#screenReaderDescription.remove();
					this.#screenReaderDescription = undefined;
				}
			});
		}
	}

	focusBackToContent(event: Event): void {
		if (this.opened()) {
			event.preventDefault();
			this.#componentRef?.grabFocus();
		}
	}

	focusOutBefore(): void {
		if (this.opened() && this.luPopoverTrigger().includes('focus')) {
			this.#componentRef?.close();
		}
	}

	updatePosition() {
		this.#overlayRef?.updatePosition();
	}

	#isIgnoredOutsidePointerTarget(target: Node): boolean {
		const ignored = this.luPopoverIgnoredOutsidePointerTargets();
		if (!ignored) {
			return false;
		}
		return (Array.isArray(ignored) ? ignored : [ignored]).some((element) => element.contains(target));
	}

	/**
	 * Resolves the anchor to its native element, when it is one. The anchor can be an ElementRef,
	 * an Element or a plain coordinate (Point); only element-based anchors can contain a pointer target.
	 */
	get #anchorElement(): Element | null {
		const anchor = this.luPopoverAnchor();
		if (anchor instanceof ElementRef) {
			return anchor.nativeElement as Element;
		}
		if (anchor instanceof Element) {
			return anchor;
		}
		return null;
	}

	#buildPositions(): ConnectedPosition[] {
		const opposite: Record<PopoverPosition, PopoverPosition> = {
			before: 'after',
			after: 'before',
			above: 'below',
			below: 'above',
		};
		// Once we have opposite, what's remaining?
		const remaining: Record<PopoverPosition, PopoverPosition[]> = {
			before: ['above', 'below'],
			after: ['above', 'below'],
			above: ['before', 'after'],
			below: ['before', 'after'],
		};
		return [this.positionPairs[this.luPopoverPositionRef()], this.positionPairs[opposite[this.luPopoverPositionRef()]], ...remaining[this.luPopoverPositionRef()].map((r) => this.positionPairs[r])];
	}
}
