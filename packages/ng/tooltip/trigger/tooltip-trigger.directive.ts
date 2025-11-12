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
	AfterContentInit,
	DestroyRef,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	NgZone,
	OnDestroy,
	Renderer2,
	booleanAttribute,
	computed,
	effect,
	inject,
	input,
	numberAttribute,
	signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SafeHtml } from '@angular/platform-browser';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { BehaviorSubject, Observable, Subject, combineLatest, merge, startWith, switchMap, timer } from 'rxjs';
import { debounce, debounceTime, filter, map } from 'rxjs/operators';
import { LuTooltipPanelComponent } from '../panel';
import { EllipsisRuler } from './ellipsis.ruler';

let nextId = 0;

@Directive({
	selector: '[luTooltip]',
	exportAs: 'luTooltip',
})
export class LuTooltipTriggerDirective implements AfterContentInit, OnDestroy {
	#overlay = inject(Overlay);

	#host = inject<ElementRef<HTMLElement>>(ElementRef);

	#renderer = inject(Renderer2);
	#ruler = inject(EllipsisRuler);
	#zone = inject(NgZone, { optional: true });

	#destroyRef = inject(DestroyRef);

	luTooltip = input<string | SafeHtml>();

	#openDelay$ = new BehaviorSubject<number>(300);

	@Input({ transform: numberAttribute })
	set luTooltipEnterDelay(delay: number) {
		this.#openDelay$.next(delay);
	}

	#closeDelay$ = new BehaviorSubject<number>(100);

	@Input({ transform: numberAttribute })
	set luTooltipLeaveDelay(delay: number) {
		this.#closeDelay$.next(delay);
	}

	luTooltipDisabled = input(false, { transform: booleanAttribute });

	@Input({ transform: booleanAttribute })
	luTooltipOnlyForDisplay = false;

	@Input()
	luTooltipPosition: LuPopoverPosition = 'above';

	luTooltipWhenEllipsis = input(false, { transform: booleanAttribute });

	luTooltipAnchor = input<FlexibleConnectedPositionStrategyOrigin>(this.#host);

	resize$ = new Observable<void>((observer) => {
		const resizeObserver = new ResizeObserver(() => {
			observer.next();
		});
		resizeObserver.observe(this.#host.nativeElement);
		return () => {
			resizeObserver.disconnect();
		};
	});

	#hasEllipsis$ = combineLatest([
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

	#hasEllipsis = toSignal(this.#hasEllipsis$, { initialValue: false });

	open$ = new Subject<void>();

	close$ = new Subject<void>();

	@HostListener('mouseenter')
	onMouseEnter() {
		this.open$.next();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.close$.next();
	}

	@HostListener('focus')
	onFocus() {
		if (this.#host.nativeElement.getAttribute('aria-expanded') !== 'true') {
			this.open$.next();
		}
	}

	@HostListener('blur')
	onBlur() {
		this.close$.next();
	}

	#generatedId = `${this.#host.nativeElement.tagName.toLowerCase()}-tooltip-${nextId++}`;

	@HostBinding('attr.id')
	_id: string;

	@HostBinding('attr.aria-describedby')
	get ariaDescribedBy() {
		if (this.luTooltipDisabled() || this.luTooltipWhenEllipsis() || this.luTooltipOnlyForDisplay) {
			return null;
		}
		return `${this.#generatedId}-panel`;
	}

	overlayRef?: OverlayRef;

	constructor() {
		combineLatest([this.#openDelay$, this.#closeDelay$])
			.pipe(
				switchMap(([openDelay, closeDelay]) => {
					// We only filter open events because even if it's disabled while opened,
					// 	we want the tooltip to be able to close itself no matter what
					const openEvents$ = this.open$.pipe(
						filter(() => {
							if (this.luTooltipDisabled()) {
								return false;
							}
							// If not disabled, let's check for ellipsis if needed
							if (this.luTooltipWhenEllipsis()) {
								return this.#hasEllipsis();
							}
							// If it's not disabled and is not triggered based on ellipsis, just return true
							return true;
						}),
						map(() => 'open'),
					);
					return merge(openEvents$, this.close$.pipe(map(() => 'close'))).pipe(
						debounce((event) => {
							return timer(event === 'open' ? openDelay : closeDelay);
						}),
					);
				}),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe((event) => {
				if (event === 'open') {
					this.openTooltip();
				} else {
					this.closeTooltip();
				}
			});

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
			ref.instance.content = this.luTooltip;
		} else if (this.luTooltipWhenEllipsis()) {
			ref.instance.content = signal(this.#host.nativeElement.innerText);
		} else {
			ref.instance.content = signal('');
		}
		ref.instance.id = this.ariaDescribedBy;
		// On tooltip leave => trigger close
		ref.instance.mouseLeave$.pipe(takeUntilDestroyed(ref.instance.destroyRef)).subscribe(() => this.close$.next());
		// On tooltip enter => trigger open to keep it opened
		ref.instance.mouseEnter$.pipe(takeUntilDestroyed(ref.instance.destroyRef)).subscribe(() => this.open$.next());
	}

	private closeTooltip(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
			delete this.overlayRef;
		}
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

		if (!isNativelyFocusableTag && !this.luTooltipWhenEllipsis() && !this.luTooltipOnlyForDisplay) {
			this.#renderer.setAttribute(this.#host.nativeElement, 'role', 'button');
		}
	}

	ngAfterContentInit(): void {
		this._id = this.#host.nativeElement.id || this.#generatedId;
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
		const position = this.luTooltipPosition;
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
