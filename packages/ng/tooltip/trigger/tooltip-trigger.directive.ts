import { FlexibleConnectedPositionStrategy, HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
	AfterContentInit,
	booleanAttribute,
	ChangeDetectorRef,
	ComponentRef,
	DestroyRef,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	inject,
	Input,
	numberAttribute,
	Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafeHtml } from '@angular/platform-browser';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { BehaviorSubject, combineLatest, merge, Observable, Subject, switchMap, timer } from 'rxjs';
import { debounce, debounceTime, filter, map } from 'rxjs/operators';
import { LuTooltipPanelComponent } from '../panel';

let nextId = 0;

@Directive({
	selector: '[luTooltip]',
	standalone: true,
})
export class LuTooltipTriggerDirective implements AfterContentInit {
	#overlay = inject(Overlay);

	#host = inject<ElementRef<HTMLElement>>(ElementRef);

	#renderer = inject(Renderer2);

	#destroyRef = inject(DestroyRef);

	#cdr = inject(ChangeDetectorRef);

	@Input()
	luTooltip: string | SafeHtml;

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

	#disabled = false;

	@Input({ transform: numberAttribute })
	set luTooltipDisabled(disabled: boolean) {
		this.#disabled = disabled;
		if (disabled) {
			this.setAccessibilityProperties(null);
		}
	}

	@Input()
	luTooltipPosition: LuPopoverPosition = 'above';

	@Input({ transform: booleanAttribute })
	luTooltipWhenEllipsis = false;

	resize$ = new Observable((observer) => {
		const resizeObserver = new ResizeObserver(() => {
			observer.next();
		});
		resizeObserver.observe(this.#host.nativeElement);
		return () => {
			resizeObserver.disconnect();
		};
	});

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
		this.open$.next();
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
		if (this.#disabled || this.luTooltipWhenEllipsis) {
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
							if (this.#disabled) {
								return false;
							}
							// If not disabled, let's check for ellipsis if needed
							if (this.luTooltipWhenEllipsis) {
								return this.hasEllipsis();
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

		this.resize$.pipe(takeUntilDestroyed(this.#destroyRef), debounceTime(150)).subscribe(() => {
			this.setAccessibilityProperties(0);
			this.#cdr.markForCheck();
		});
	}

	private openTooltip(): void {
		// If tooltip is already opened, don't do anything
		if (this.overlayRef) {
			return;
		}
		this.overlayRef = this.#overlay.create({
			positionStrategy: this.legacyPositionBuilder(),
			scrollStrategy: this.#overlay.scrollStrategies.close(),
			disposeOnNavigation: true,
		});
		const portal = new ComponentPortal(LuTooltipPanelComponent);
		const ref = this.overlayRef.attach(portal);
		if (this.luTooltip) {
			ref.instance.content = this.luTooltip;
		} else if (this.luTooltipWhenEllipsis) {
			ref.instance.content = this.#host.nativeElement.innerText;
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
		if (this.#disabled || (this.luTooltipWhenEllipsis && !this.hasEllipsis())) {
			this.#renderer.removeAttribute(this.#host.nativeElement, 'tabindex');
			return;
		}

		const tag = this.#host.nativeElement.tagName.toLowerCase();
		const nativelyFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];
		const isNatevelyFocusableTag = nativelyFocusableTags.includes(tag);

		const hasATabIndex = this.#host.nativeElement.getAttribute('tabindex') !== null;

		if (!isNatevelyFocusableTag && !hasATabIndex) {
			this.#renderer.setAttribute(this.#host.nativeElement, 'tabindex', tabindex.toString());
		}
	}

	/**
	 * Hacky af but let's explain everything
	 * This method checks for ellipsis by cloning the node and checking its width against original element.
	 *
	 * We used to do this using scrollWidth but the thing is, it's a rounded value. Sometimes,
	 * you'd get true while it should be false and vice-versa, because of rounding.
	 *
	 * We could also use getBoundingClientRect() but it only considers text content, meaning that if ellipsis is caused by
	 * any margin or padding, it won't be detected
	 *
	 * @private
	 */
	private hasEllipsis(): boolean {
		if (window.getComputedStyle(this.#host.nativeElement).textOverflow !== 'ellipsis') {
			return false;
		}

		const mask = this.#renderer.createElement('div') as HTMLDivElement;
		const clone = this.#host.nativeElement.cloneNode(true) as HTMLElement;

		this.#renderer.setStyle(clone, 'position', 'fixed');
		this.#renderer.setStyle(clone, 'overflow', 'visible');
		this.#renderer.setStyle(clone, 'white-space', 'nowrap');
		this.#renderer.setStyle(clone, 'visibility', 'hidden');
		this.#renderer.setStyle(clone, 'width', 'fit-content');

		this.#renderer.addClass(mask, 'u-mask');
		this.#renderer.setAttribute(mask, 'aria-hidden', 'true');
		this.#renderer.appendChild(mask, clone);

		this.#renderer.appendChild(this.#host.nativeElement.parentElement, mask);
		try {
			const fullWidth = clone.getBoundingClientRect().width;
			const displayWidth = this.#host.nativeElement.getBoundingClientRect().width;

			return fullWidth > displayWidth;
		} catch (e) {
			return false;
		} finally {
			mask.remove();
		}
	}

	ngAfterContentInit(): void {
		this.setAccessibilityProperties(0);
		this._id = this.#host.nativeElement.id || this.#generatedId;
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
			.flexibleConnectedTo(this.#host)
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
