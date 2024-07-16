import { booleanAttribute, DestroyRef, Directive, ElementRef, HostBinding, HostListener, inject, Injector, input, Input, InputSignal, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverContentComponent } from './content/popover-content/popover-content.component';
import { POPOVER_CONFIG, PopoverConfig } from './popover-tokens';
import { combineLatest, debounce, filter, map, merge, Subject, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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
	standalone: true,
})
export class PopoverDirective {
	#overlay = inject(Overlay);

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#vcr = inject(ViewContainerRef);

	#destroyRef = inject(DestroyRef);

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

	luPopoverTrigger = input<'click' | 'click+hover'>('click');

	@Input()
	customPositions?: ConnectionPositionPair[];

	// We have to type these two for Compodoc to find the right type and tell Storybook these aren't strings
	luPopoverOpenDelay: InputSignal<number> = input<number>(300);

	luPopoverCloseDelay: InputSignal<number> = input<number>(100);

	open$ = new Subject<void>();

	close$ = new Subject<void>();

	#overlayRef: OverlayRef;

	#componentRef?: PopoverContentComponent;

	positionPairs: Record<PopoverPosition, ConnectionPositionPair> = defaultPositionPairs;

	opened = signal(false);

	@HostBinding('attr.aria-controls')
	ariaControls = `popover-content-${nextId++}`;

	constructor() {
		combineLatest([toObservable(this.luPopoverOpenDelay), toObservable(this.luPopoverCloseDelay), toObservable(this.luPopoverTrigger)])
			.pipe(
				filter(([, , trigger]) => {
					return trigger.includes('hover');
				}),
				switchMap(([openDelay, closeDelay]) => {
					return merge(this.open$.pipe(map(() => 'open')), this.close$.pipe(map(() => 'close'))).pipe(
						debounce((event) => {
							return timer(event === 'open' ? openDelay : closeDelay);
						}),
					);
				}),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe((event) => {
				if (event === 'open') {
					this.openPopover(true);
				} else {
					this.#componentRef?.close();
				}
			});
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		this.open$.next();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.close$.next();
	}

	@HostListener('click')
	click(): void {
		if (this.opened()) {
			this.#componentRef?.close();
		} else {
			this.openPopover();
		}
	}

	openPopover(disableFocusHandler = false): void {
		if (!this.opened() && !this.luPopoverDisabled) {
			this.opened.set(true);
			this.#overlayRef =
				this.#overlayRef ||
				this.#overlay.create({
					positionStrategy: this.#overlay
						.position()
						.flexibleConnectedTo(this.#elementRef)
						.withPositions(this.customPositions || this.#buildPositions()),
					scrollStrategy: this.#overlay.scrollStrategies.reposition(),
					hasBackdrop: this.luPopoverTrigger() === 'click',
					backdropClass: '',
					disposeOnNavigation: true,
				});
			// Close on backdrop click even if backdrop is invisible
			this.#overlayRef
				.backdropClick()
				.pipe(takeUntilDestroyed(this.#destroyRef))
				.subscribe(() => this.#componentRef.close());
			const config: PopoverConfig = {
				content: this.content,
				ref: this.#overlayRef,
				contentId: this.ariaControls,
				triggerElement: this.#elementRef.nativeElement,
				disableFocusManipulation: disableFocusHandler,
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
			this.#componentRef.mouseEnter$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.open$.next());
			this.#componentRef.closed$.pipe(takeUntilDestroyed(this.#componentRef.destroyRef), takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.opened.set(false));
		}
	}

	@HostListener('keydown.Tab', ['$event'])
	focusBackToContent(event: KeyboardEvent): void {
		if (this.opened()) {
			event.preventDefault();
			this.#componentRef.grabFocus();
		}
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
