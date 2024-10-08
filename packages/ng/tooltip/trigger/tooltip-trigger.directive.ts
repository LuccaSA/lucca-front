import { FlexibleConnectedPositionStrategy, HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
	AfterContentInit,
	booleanAttribute,
	ChangeDetectorRef,
	DestroyRef,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	inject,
	Input,
	numberAttribute,
	OnDestroy,
	Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafeHtml } from '@angular/platform-browser';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { BehaviorSubject, combineLatest, merge, Observable, startWith, Subject, switchMap, timer } from 'rxjs';
import { debounce, debounceTime, filter, map } from 'rxjs/operators';
import { LuTooltipPanelComponent } from '../panel';

let nextId = 0;

@Directive({
	selector: '[luTooltip]',
	exportAs: 'luTooltip',
	standalone: true,
})
export class LuTooltipTriggerDirective implements AfterContentInit, OnDestroy {
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

	@Input({ transform: booleanAttribute })
	set luTooltipDisabled(disabled: boolean) {
		this.#disabled = disabled;
		if (disabled) {
			this.setAccessibilityProperties(null);
		}
	}

	@Input({ transform: booleanAttribute })
	luTooltipOnlyForDisplay = false;

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
		if (this.#disabled || this.luTooltipWhenEllipsis || this.luTooltipOnlyForDisplay) {
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
	 * So we duplicate the properties we're interested in on the element to be tested to calculate its ideal size,
	 * which we then compare with its current size.
	 *
	 * @private
	 */
	private hasEllipsis(): boolean {
		if (window.getComputedStyle(this.#host.nativeElement).textOverflow !== 'ellipsis') {
			return false;
		}

		const element = this.#host.nativeElement;
		const elementCloned = this.#renderer.createElement('div') as HTMLDivElement;
		const parentMasked = this.#renderer.createElement('div') as HTMLDivElement;
		const elementStyle = window.getComputedStyle(element);

		this.#renderer.addClass(parentMasked, 'u-mask');
		this.#renderer.setAttribute(parentMasked, 'aria-hidden', 'true');

		this.#renderer.setStyle(elementCloned, 'width', 'fit-content');

		this.#renderer.setStyle(elementCloned, 'padding', elementStyle.padding);
		this.#renderer.setStyle(elementCloned, 'borderWidth', elementStyle.borderWidth);
		this.#renderer.setStyle(elementCloned, 'borderStyle', elementStyle.borderStyle);
		this.#renderer.setStyle(elementCloned, 'boxSizing', elementStyle.boxSizing);
		this.#renderer.setStyle(elementCloned, 'fontFamily', elementStyle.fontFamily);
		this.#renderer.setStyle(elementCloned, 'fontWeight', elementStyle.fontWeight);
		this.#renderer.setStyle(elementCloned, 'fontStyle', elementStyle.fontStyle);
		this.#renderer.setStyle(elementCloned, 'whiteSpace', 'nowrap');
		this.#renderer.setStyle(
			elementCloned,
			'fontSize',
			(Number(elementStyle.fontSize.replace('px', '')) / Number(window.getComputedStyle(document.body).fontSize.replace('px', ''))).toString() + 'rem',
		);

		elementCloned.innerHTML = element.innerHTML;

		this.#renderer.appendChild(parentMasked, elementCloned);
		this.#renderer.appendChild(document.body, parentMasked);

		try {
			const elementClonedWidth = elementCloned.getBoundingClientRect().width;
			const elementWidth = element.getBoundingClientRect().width;

			return elementClonedWidth > elementWidth;
		} catch (e) {
			return false;
		} finally {
			parentMasked.remove();
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
