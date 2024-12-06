import {
	booleanAttribute,
	DestroyRef,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	inject,
	Injector,
	input,
	Input,
	InputSignal,
	model,
	OnDestroy,
	output,
	Renderer2,
	signal,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { ConnectedPosition, ConnectionPositionPair, FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverContentComponent } from './content/popover-content/popover-content.component';
import { POPOVER_CONFIG, PopoverConfig } from './popover-tokens';
import { combineLatest, debounce, filter, map, merge, Subject, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { LU_POPOVER2_TRANSLATIONS } from './popover2.translate';
import { getIntl } from '@lucca-front/ng/core';

export type PopoverPosition = 'above' | 'below' | 'before' | 'after';

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
	},
	exportAs: 'luPopover2',
	standalone: true,
})
export class PopoverDirective implements OnDestroy {
	#overlay = inject(Overlay);

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#vcr = inject(ViewContainerRef);

	#destroyRef = inject(DestroyRef);

	#renderer = inject(Renderer2);

	intl = getIntl(LU_POPOVER2_TRANSLATIONS);

	@Input({
		alias: 'luPopover2',
	})
	content: TemplateRef<unknown>;

	@Input()
	luPopoverPosition: PopoverPosition = 'above';

	@Input({
		transform: booleanAttribute,
	})
	luPopoverDisabled = false;

	luPopoverTrigger = model<'click' | 'click+hover' | 'hover+focus'>('click');

	@Input()
	customPositions?: ConnectionPositionPair[];

	@Input({ transform: booleanAttribute })
	/**
	 * Removes close button entirely, this is bad for a11y but sometimes we want it.
	 */
	luPopoverNoCloseButton = false;

	/**
	 * Allows to anchor the popover to another element instead of the trigger one
	 * for placement purpose
	 */
	luPopoverAnchor = input<FlexibleConnectedPositionStrategyOrigin>(this.#elementRef);

	// We have to type these two for Compodoc to find the right type and tell Storybook these aren't strings
	luPopoverOpenDelay: InputSignal<number> = input<number>(300);

	luPopoverCloseDelay: InputSignal<number> = input<number>(100);

	open$ = new Subject<'focus' | 'click' | 'hover'>();

	close$ = new Subject<void>();

	luPopoverClosed = output<void>();

	#listenToMouseLeave = false;
	#listenToMouseEnter = true;

	#overlayRef: OverlayRef;

	#componentRef?: PopoverContentComponent;

	positionPairs: Record<PopoverPosition, ConnectionPositionPair> = defaultPositionPairs;

	opened = signal(false);

	@HostBinding('attr.aria-controls')
	ariaControls = `popover-content-${nextId++}`;

	#screenReaderDescription?: HTMLSpanElement;

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
					this.openPopover(type === 'focus', true);
					this.#listenToMouseLeave = type !== 'click';
					if (type === 'focus' && !this.#screenReaderDescription) {
						this.#screenReaderDescription = this.#renderer.createElement('span') as HTMLSpanElement;
						this.#screenReaderDescription.innerText = this.intl.screenReaderDescription;
						this.#renderer.addClass(this.#screenReaderDescription, 'u-mask');
						this.#renderer.appendChild(this.#elementRef.nativeElement, this.#screenReaderDescription);
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

	@HostListener('mouseenter')
	onMouseEnter() {
		if (this.#listenToMouseEnter && this.luPopoverTrigger().includes('hover')) {
			this.open$.next('hover');
			this.#listenToMouseLeave = true;
		}
	}

	@HostListener('focus')
	onFocus() {
		if (this.luPopoverTrigger().includes('focus')) {
			this.open$.next('focus');
			this.#listenToMouseLeave = true;
		}
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		if (this.#listenToMouseLeave && this.luPopoverTrigger().includes('hover')) {
			this.close$.next();
			this.#listenToMouseEnter = true;
		}
	}

	@HostListener('click')
	click(): void {
		if (this.opened()) {
			this.#componentRef?.close();
			this.#listenToMouseLeave = true;
		} else {
			this.openPopover(true);
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

	openPopover(withBackdrop = false, disableFocusHandler = false): void {
		if (!this.opened() && !this.luPopoverDisabled) {
			this.opened.set(true);
			this.#overlayRef = this.#overlay.create({
				positionStrategy: this.#overlay
					.position()
					.flexibleConnectedTo(this.luPopoverAnchor())
					.withPositions(this.customPositions || this.#buildPositions()),
				scrollStrategy: this.#overlay.scrollStrategies.reposition(),
				hasBackdrop: withBackdrop,
				backdropClass: '',
				disposeOnNavigation: true,
			});
			// Close on backdrop click even if backdrop is invisible
			this.#overlayRef
				.backdropClick()
				.pipe(takeUntilDestroyed(this.#destroyRef))
				.subscribe(() => {
					this.#componentRef.close();
					this.#listenToMouseLeave = true;
				});
			const config: PopoverConfig = {
				content: this.content,
				ref: this.#overlayRef,
				contentId: this.ariaControls,
				triggerElement: this.#elementRef.nativeElement,
				disableFocusManipulation: disableFocusHandler,
				noCloseButton: this.luPopoverNoCloseButton,
			};
			this.#componentRef = this.#overlayRef.attach(
				new ComponentPortal(
					PopoverContentComponent,
					this.#vcr,
					Injector.create({
						providers: [{ provide: POPOVER_CONFIG, useValue: config }],
					}),
				),
			).instance;
			// On tooltip leave => trigger close
			this.#componentRef.mouseLeave$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.close$.next());
			// On tooltip enter => trigger open to keep it opened
			this.#componentRef.mouseEnter$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.open$.next('hover'));
			this.#componentRef.closed$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
				this.opened.set(false);
				this.luPopoverClosed.emit();
				this.#listenToMouseLeave = false;
				if (this.#screenReaderDescription) {
					this.#screenReaderDescription.remove();
					this.#screenReaderDescription = undefined;
				}
			});
		}
	}

	@HostListener('keydown.Tab', ['$event'])
	focusBackToContent(event: Event): void {
		if (this.opened()) {
			event.preventDefault();
			this.#componentRef.grabFocus();
		}
	}

	@HostListener('keydown.Shift.Tab', ['$event'])
	focusOutBefore(): void {
		if (this.opened() && this.luPopoverTrigger().includes('focus')) {
			this.#componentRef.close();
		}
	}

	updatePosition() {
		this.#overlayRef?.updatePosition();
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
		return [this.positionPairs[this.luPopoverPosition], this.positionPairs[opposite[this.luPopoverPosition]], ...remaining[this.luPopoverPosition].map((r) => this.positionPairs[r])];
	}
}
