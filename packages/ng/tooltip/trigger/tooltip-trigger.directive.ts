import {
	FlexibleConnectedPositionStrategy,
	FlexibleConnectedPositionStrategyOrigin,
	HorizontalConnectionPos,
	OriginConnectionPosition,
	Overlay,
	OverlayConnectionPosition,
	OverlayRef,
	VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
	afterRenderEffect,
	booleanAttribute,
	computed,
	DestroyRef,
	Directive,
	effect,
	EffectRef,
	ElementRef,
	inject,
	Injector,
	input,
	linkedSignal,
	numberAttribute,
	OnDestroy,
	Renderer2,
	signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { SafeHtml } from '@angular/platform-browser';
import { isNotNil, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { startWith, timer } from 'rxjs';
import { debounce, filter, map, tap } from 'rxjs/operators';
import { LuTooltipPanelComponent } from '../panel';
import { TooltipVisibilityObserver } from './tooltip-visibility.observer';

let nextId = 0;

@Directive({
	selector: '[luTooltip]',
	exportAs: 'luTooltip',
	host: {
		'[attr.aria-describedby]': 'ariaDescribedBy()',
		'[attr.id]': 'id()',
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()',
		'(focus)': 'onFocus()',
		'(blur)': 'onBlur()',
	},
})
export class LuTooltipTriggerDirective implements OnDestroy {
	readonly #overlay = inject(Overlay);
	readonly #host = inject<ElementRef<HTMLElement>>(ElementRef);
	readonly #renderer = inject(Renderer2);
	readonly #document = inject(DOCUMENT);
	readonly #injector = inject(Injector);
	readonly #destroyRef = inject(DestroyRef);
	readonly #visibilityObserver = inject(TooltipVisibilityObserver);

	readonly luTooltipInput = input<string | SafeHtml>('', { alias: 'luTooltip' });
	readonly luTooltip = linkedSignal<string | SafeHtml>(() => this.luTooltipInput());

	readonly luTooltipEnterDelay = input(300, { transform: numberAttribute });
	readonly luTooltipLeaveDelay = input(100, { transform: numberAttribute });
	readonly luTooltipDisabled = input(false, { transform: booleanAttribute });
	readonly luTooltipOnlyForDisplay = input(false, { transform: booleanAttribute });
	readonly luTooltipPosition = input<LuPopoverPosition>('above');

	readonly luTooltipWhenEllipsisInput = input(false, { alias: 'luTooltipWhenEllipsis', transform: booleanAttribute });
	readonly luTooltipWhenEllipsis = linkedSignal(() => this.luTooltipWhenEllipsisInput());

	readonly luTooltipAnchor = input<FlexibleConnectedPositionStrategyOrigin>(this.#host);
	readonly id = input<string>(`${this.#host.nativeElement.tagName.toLowerCase()}-tooltip-${nextId++}`);

	readonly ariaDescribedBy = computed(() => {
		if (this.luTooltipDisabled() || this.luTooltipWhenEllipsis() || this.luTooltipOnlyForDisplay()) {
			return null;
		}
		return `${this.id()}-panel`;
	});

	overlayRef?: OverlayRef;

	// 0 until the element first appears; bumped for the initial measurement and on every real
	// size/content change. Scrolling in and out of view does NOT bump it (see #armMeasurementObservers).
	readonly #measureTrigger = signal(0);

	// guards the one-time setup of the persistent resize/mutation observers
	#measurementObserversArmed = false;

	// the IntersectionObserver callback can fire after the view is destroyed; avoid touching
	// the destroyed injector (NG0911) when that happens
	#destroyed = false;

	// written only from the `read` phase of the afterRenderEffect below
	readonly #hasEllipsis = signal(false);

	// reusable hidden clone, one per directive, used to measure the unconstrained width
	#clone?: HTMLDivElement;

	readonly #action = signal<'open' | 'close' | null>(null);
	readonly #realAction = linkedSignal<'open' | 'close' | null, 'open' | 'close' | null>({
		source: this.#action,
		computation: (action, previous): 'open' | 'close' | null => {
			if (!action || action === 'close') {
				return action;
			}

			// We only filter open events because even if it's disabled while opened,
			// we want the tooltip to be able to close itself no matter what
			if (this.luTooltipDisabled()) {
				return previous?.value ?? null;
			}

			if (this.luTooltipWhenEllipsis()) {
				return this.#hasEllipsis() ? 'open' : (previous?.value ?? null);
			}

			return 'open';
		},
	});

	#effectRef?: EffectRef;

	constructor() {
		this.#destroyRef.onDestroy(() => (this.#destroyed = true));

		// Action debounce pipeline — kept as Observable since signals can't debounce
		toObservable(this.#realAction)
			.pipe(
				filter(isNotNil),
				debounce((action) => timer(action === 'open' ? this.luTooltipEnterDelay() : this.luTooltipLeaveDelay())),
				tap((event) => {
					if (event === 'open') {
						this.openTooltip();
					} else {
						this.closeTooltip();
					}
				}),
				takeUntilDestroyed(),
			)
			.subscribe();

		effect(() => {
			if (!this.luTooltipDisabled() && (!this.luTooltipWhenEllipsis() || this.#hasEllipsis())) {
				this.setAccessibilityProperties(0);
			} else {
				this.setAccessibilityProperties(null);
			}
		});

		// Defer the first measurement until the element is near the viewport, then stop tracking
		// visibility: scrolling must not re-measure, so we arm the resize/mutation observers once.
		// A single shared IntersectionObserver handles every tooltip (see TooltipVisibilityObserver).
		effect((onCleanup) => {
			if (!this.luTooltipWhenEllipsis() || this.luTooltipDisabled() || this.#measurementObserversArmed) {
				return;
			}

			const el = this.#host.nativeElement;
			this.#visibilityObserver.observeOnce(el, () => this.#armMeasurementObservers());

			onCleanup(() => this.#visibilityObserver.unobserve(el));
		});

		// Ellipsis measurement, split across afterRenderEffect phases so that — across every tooltip
		// on the page — all DOM writes happen together, then all geometry reads happen together.
		// This keeps the whole batch to a single forced reflow instead of one reflow per element.
		afterRenderEffect({
			earlyRead: () => {
				// reading the trigger registers the dependency; 0 means "not measured yet"
				const measured = this.#measureTrigger() > 0;
				const shouldMeasure = measured && !this.luTooltipDisabled() && this.luTooltipWhenEllipsis();
				if (!shouldMeasure) {
					return { measure: false } as const;
				}
				const host = this.#host.nativeElement;
				const hostStyle = getComputedStyle(host);
				if (hostStyle.textOverflow !== 'ellipsis') {
					return { measure: false } as const;
				}
				return { measure: true, host, hostStyle } as const;
			},
			write: (earlyReadResult) => {
				const snapshot = earlyReadResult();
				if (!snapshot.measure) {
					return { measure: false } as const;
				}
				const clone = (this.#clone ??= this.#createClone());
				this.#applyClonedStyles(clone, snapshot.hostStyle);
				clone.innerHTML = snapshot.host.innerHTML;
				return { measure: true, host: snapshot.host, clone } as const;
			},
			read: (writeResult) => {
				const measurement = writeResult();
				if (!measurement.measure) {
					this.#hasEllipsis.set(false);
					return;
				}
				const cloneWidth = measurement.clone.getBoundingClientRect().width;
				const hostWidth = measurement.host.getBoundingClientRect().width;
				// rounded to 3 decimals to ignore sub-pixel noise
				this.#hasEllipsis.set(Math.round(cloneWidth * 1000) > Math.round(hostWidth * 1000));
			},
		});

		this.#destroyRef.onDestroy(() => this.#clone?.remove());
	}

	// Set up — once — the observers that ask for a re-measurement on real size/content changes.
	// They stay connected for the directive lifetime (even off-screen), so scrolling never
	// re-measures; only an actual resize/mutation does.
	#armMeasurementObservers(): void {
		if (this.#measurementObserversArmed || this.#destroyed) {
			return;
		}
		this.#measurementObserversArmed = true;

		const el = this.#host.nativeElement;
		const bump = () => this.#measureTrigger.update((v) => v + 1);

		const resizeObserver = new ResizeObserver(() => bump());
		resizeObserver.observe(el);

		const mutationObserver = new MutationObserver(() => bump());
		mutationObserver.observe(el, { characterData: true, subtree: true, childList: true });

		this.#destroyRef.onDestroy(() => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		});

		// initial measurement now that the element has appeared
		bump();
	}

	#createClone(): HTMLDivElement {
		const clone = this.#document.createElement('div');
		clone.setAttribute('aria-hidden', 'true');
		Object.assign(clone.style, {
			inlineSize: 'fit-content',
			whiteSpace: 'nowrap',
			// `fixed` + pinned origin keeps the (potentially very wide) clone out of the
			// document's scrollable overflow, so measuring never flashes a scrollbar.
			position: 'fixed',
			insetBlockStart: '0',
			insetInlineStart: '0',
			visibility: 'hidden',
			pointerEvents: 'none',
			contain: 'layout',
		});
		this.#document.body.appendChild(clone);
		return clone;
	}

	#applyClonedStyles(clone: HTMLDivElement, hostStyle: CSSStyleDeclaration): void {
		const { padding, borderWidth, borderStyle, boxSizing, fontFamily, fontWeight, fontStyle, fontSize } = hostStyle;
		Object.assign(clone.style, { padding, borderWidth, borderStyle, boxSizing, fontFamily, fontWeight, fontStyle, fontSize });
	}

	onMouseEnter() {
		this.#action.set('open');
	}

	onMouseLeave() {
		this.#action.set('close');
	}

	onFocus() {
		if (this.#host.nativeElement.getAttribute('aria-expanded') !== 'true') {
			this.#action.set('open');
		}
	}

	onBlur() {
		this.#action.set('close');
	}

	requestOpen() {
		this.#action.set('open');
	}

	requestClose() {
		this.#action.set('close');
	}

	ngOnDestroy(): void {
		this.closeTooltip();
		if (this.overlayRef) {
			this.overlayRef.dispose();
			delete this.overlayRef;
		}
	}

	private prepareOverlay(): void {
		if (this.overlayRef) {
			return;
		}
		this.overlayRef = this.#overlay.create({
			scrollStrategy: this.#overlay.scrollStrategies.close(),
			disposeOnNavigation: true,
		});
		const describedBy = this.ariaDescribedBy();
		if (describedBy !== null) {
			this.overlayRef.overlayElement.id = describedBy;
		}
	}

	private openTooltip(): void {
		if (this.overlayRef?.hasAttached()) {
			return;
		}
		const position = this.legacyPositionBuilder();
		if (!this.overlayRef) {
			this.overlayRef = this.#overlay.create({
				positionStrategy: position,
				scrollStrategy: this.#overlay.scrollStrategies.close(),
				disposeOnNavigation: true,
			});
		} else {
			this.overlayRef.updatePositionStrategy(position);
		}
		const portal = new ComponentPortal(LuTooltipPanelComponent);
		const ref = this.overlayRef.attach(portal);
		position.positionChanges
			.pipe(
				takeUntilDestroyed(this.#destroyRef),
				map(({ connectionPair }) => connectionPair),
				startWith(position.positions[0]),
			)
			.subscribe(({ overlayX, overlayY }) => {
				ref.instance.setPanelPosition(overlayX, overlayY);
			});

		if (this.luTooltip()) {
			this.#effectRef = ɵeffectWithDeps(
				[this.luTooltip],
				(luTooltip) => {
					ref.instance.content.set(luTooltip);
				},
				{ injector: this.#injector },
			);
		} else if (this.luTooltipWhenEllipsis()) {
			ref.instance.content.set(this.#host.nativeElement.innerText);
		} else {
			ref.instance.content.set('');
		}

		ref.instance.mouseLeave$.pipe(takeUntilDestroyed(ref.instance.destroyRef)).subscribe(() => this.#action.set('close'));
		ref.instance.mouseEnter$.pipe(takeUntilDestroyed(ref.instance.destroyRef)).subscribe(() => this.#action.set('open'));
	}

	private closeTooltip(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
		}
		this.#effectRef?.destroy();
	}

	private setAccessibilityProperties(tabindex: number | null): void {
		if (tabindex === null) {
			this.#renderer.removeAttribute(this.#host.nativeElement, 'tabindex');
			return;
		}

		if (!this.luTooltipWhenEllipsis() && !this.luTooltipOnlyForDisplay()) {
			this.prepareOverlay();
		}

		const tag = this.#host.nativeElement.tagName.toLowerCase();
		const nativelyFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];
		const isNativelyFocusableTag = nativelyFocusableTags.includes(tag);

		const hasATabIndex = this.#host.nativeElement.getAttribute('tabindex') !== null;

		if (!isNativelyFocusableTag && !hasATabIndex) {
			this.#renderer.setAttribute(this.#host.nativeElement, 'tabindex', tabindex.toString());
		}

		if (!isNativelyFocusableTag && !this.luTooltipWhenEllipsis() && !this.luTooltipOnlyForDisplay()) {
			this.#renderer.setAttribute(this.#host.nativeElement, 'role', 'button');
		}
	}

	// Legacy position builder to handle existing position API
	private legacyPositionBuilder(): FlexibleConnectedPositionStrategy {
		const connectionPosition: OriginConnectionPosition = {
			originX: 'start',
			originY: 'top',
		};

		// Position
		const position = this.luTooltipPosition();
		if (position === 'above') {
			connectionPosition.originY = 'top';
		} else if (position === 'below') {
			connectionPosition.originY = 'bottom';
		} else if (position === 'before') {
			connectionPosition.originX = 'start';
		} else if (position === 'after') {
			connectionPosition.originX = 'end';
		}

		// Alignment
		if (position === 'above' || position === 'below') {
			connectionPosition.originX = 'center';
		} else {
			connectionPosition.originY = 'center';
		}

		const overlayPosition: OverlayConnectionPosition = {
			overlayX: 'start',
			overlayY: 'top',
		};

		if (position === 'above' || position === 'below') {
			overlayPosition.overlayX = connectionPosition.originX;
			overlayPosition.overlayY = position === 'above' ? 'bottom' : 'top';
		} else {
			overlayPosition.overlayX = position === 'before' ? 'end' : 'start';
			overlayPosition.overlayY = connectionPosition.originY;
		}

		return this.#overlay
			.position()
			.flexibleConnectedTo(this.luTooltipAnchor())
			.withPositions([
				{
					originX: connectionPosition.originX,
					originY: connectionPosition.originY,
					overlayX: overlayPosition.overlayX,
					overlayY: overlayPosition.overlayY,
				},
				{
					originX: connectionPosition.originX,
					originY: this.invertVerticalPos(connectionPosition.originY),
					overlayX: overlayPosition.overlayX,
					overlayY: this.invertVerticalPos(overlayPosition.overlayY),
				},
				{
					originX: this.invertHorizontalPos(connectionPosition.originX),
					originY: connectionPosition.originY,
					overlayX: this.invertHorizontalPos(overlayPosition.overlayX),
					overlayY: overlayPosition.overlayY,
				},
				{
					originX: this.invertHorizontalPos(connectionPosition.originX),
					originY: this.invertVerticalPos(connectionPosition.originY),
					overlayX: this.invertHorizontalPos(overlayPosition.overlayX),
					overlayY: this.invertVerticalPos(overlayPosition.overlayY),
				},
			]);
	}

	private invertVerticalPos(y: VerticalConnectionPos): VerticalConnectionPos {
		if (y === 'top') {
			return 'bottom';
		} else if (y === 'bottom') {
			return 'top';
		}
		return y;
	}

	private invertHorizontalPos(x: HorizontalConnectionPos): HorizontalConnectionPos {
		if (x === 'end') {
			return 'start';
		} else if (x === 'start') {
			return 'end';
		}
		return x;
	}
}
