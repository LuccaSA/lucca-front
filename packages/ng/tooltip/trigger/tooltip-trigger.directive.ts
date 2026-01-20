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
import {
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
	NgZone,
	numberAttribute,
	OnDestroy,
	Renderer2,
	signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SafeHtml } from '@angular/platform-browser';
import { isNotNil, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { combineLatest, Observable, startWith, switchMap, timer } from 'rxjs';
import { debounce, debounceTime, filter, map, tap } from 'rxjs/operators';
import { LuTooltipPanelComponent } from '../panel';
import { EllipsisRuler } from './ellipsis.ruler';

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
	readonly #ruler = inject(EllipsisRuler);
	readonly #zone = inject(NgZone, { optional: true });

	readonly #injector = inject(Injector);
	readonly #destroyRef = inject(DestroyRef);

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

	readonly resize$ = new Observable<void>((observer) => {
		const resizeObserver = new ResizeObserver(() => {
			observer.next();
		});
		resizeObserver.observe(this.#host.nativeElement);
		return () => {
			resizeObserver.disconnect();
		};
	});

	readonly #hasEllipsis$ = combineLatest([
		toObservable(
			// 1. Group necessary inputs
			computed(() => ({ whenEllipsis: this.luTooltipWhenEllipsis(), disabled: this.luTooltipDisabled() })),
		),
		// Resend resize events to trigger the check
		this.resize$.pipe(debounceTime(150)),
	]).pipe(
		// 2. Keep only necessary inputs
		filter(([{ whenEllipsis, disabled }]) => !disabled && whenEllipsis),
		// 3. Check for ellipsis
		switchMap(() => this.runOutsideZoneJS(() => this.#ruler.hasEllipsis(this.#host.nativeElement))),
	);

	readonly #hasEllipsis = toSignal(this.#hasEllipsis$, { initialValue: false });

	readonly #action = signal<'open' | 'close' | null>(null);
	readonly #realAction = linkedSignal<'open' | 'close' | null, 'open' | 'close' | null>({
		source: this.#action,
		computation: (action, previous) => {
			if (!action || action === 'close') {
				return action;
			}

			// We only filter open events because even if it's disabled while opened,
			// we want the tooltip to be able to close itself no matter what
			if (this.luTooltipDisabled()) {
				return previous?.value;
			}

			// If not disabled, let's check for ellipsis if needed
			if (this.luTooltipWhenEllipsis()) {
				return this.#hasEllipsis() ? 'open' : previous.value;
			}

			// If it's not disabled and is not triggered based on ellipsis, just return true
			return 'open';
		},
	});

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

	readonly ariaDescribedBy = computed(() => {
		if (this.luTooltipDisabled() || this.luTooltipWhenEllipsis() || this.luTooltipOnlyForDisplay()) {
			return null;
		}
		return `${this.id()}-panel`;
	});

	overlayRef?: OverlayRef;
	#effectRef?: EffectRef;
	#idEffectRef?: EffectRef;

	constructor() {
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
	}

	ngOnDestroy(): void {
		this.closeTooltip();
	}

	private openTooltip(): void {
		// If tooltip is already opened, don't do anything
		if (this.overlayRef) {
			return;
		}
		const position = this.legacyPositionBuilder();
		this.overlayRef = this.#overlay.create({
			positionStrategy: position,
			scrollStrategy: this.#overlay.scrollStrategies.close(),
			disposeOnNavigation: true,
		});
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

		this.#idEffectRef = ɵeffectWithDeps(
			[this.ariaDescribedBy],
			(ariaDescribedBy) => {
				ref.instance.id.set(ariaDescribedBy);
			},
			{ injector: this.#injector },
		);

		// On tooltip leave => trigger close
		ref.instance.mouseLeave$.pipe(takeUntilDestroyed(ref.instance.destroyRef)).subscribe(() => this.#action.set('close'));
		// On tooltip enter => trigger open to keep it opened
		ref.instance.mouseEnter$.pipe(takeUntilDestroyed(ref.instance.destroyRef)).subscribe(() => this.#action.set('open'));
	}

	private closeTooltip(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
			delete this.overlayRef;
		}
		this.#effectRef?.destroy();
		this.#idEffectRef?.destroy();
	}

	private setAccessibilityProperties(tabindex: number | null): void {
		if (tabindex === null) {
			this.#renderer.removeAttribute(this.#host.nativeElement, 'tabindex');
			return;
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

	private runOutsideZoneJS<T>(callback: () => T): T {
		return this.#zone ? this.#zone.runOutsideAngular(callback) : callback();
	}

	/**********************
	 *
	 * LEGACY STUFF TO HANDLE EXISTING POSITIONS
	 *
	 ***********************/

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

	requestClose() {
		this.#action.set('close');
	}

	requestOpen() {
		this.#action.set('open');
	}
}
