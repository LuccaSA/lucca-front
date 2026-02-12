import { ConnectionPositionPair, HorizontalConnectionPos, OriginConnectionPosition, OverlayConnectionPosition, VerticalConnectionPos } from '@angular/cdk/overlay';
import { DestroyRef, Directive, inject, Input, OnInit, TemplateRef, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isNil } from '@lucca-front/ng/core';
import { ALuPopoverPanel, LuPopoverAlignment } from '@lucca-front/ng/popover';
import { PopoverDirective } from '@lucca-front/ng/popover2';

@Directive({
	selector: '[luDropdown]',
	exportAs: 'LuDropdownTrigger',
	host: {
		'[attr.aria-expanded]': 'popover2.opened()',
	},
	hostDirectives: [
		{
			directive: PopoverDirective,
			inputs: ['luPopoverPosition: luDropdownPosition', 'luPopoverDisabled: luDropdownDisabled', 'customPositions'],
			outputs: ['luPopoverOpened: luDropdownOnOpen', 'luPopoverClosed: luDropdownOnClose'],
		},
	],
})
export class LuDropdownTriggerDirective<_T> implements OnInit {
	protected popover2 = inject(PopoverDirective);
	#destroyRef = inject(DestroyRef);
	// Keeping generic type here just for the sake of backwards compatibility
	/** References the popover instance that the trigger is associated with. */
	@Input('luDropdown') set inputPanel(p: TemplateRef<unknown> | Type<unknown> | ALuPopoverPanel) {
		if (p instanceof ALuPopoverPanel) {
			this.popover2.content = p.templateRef;
			p.close.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.popover2.close());
		} else {
			this.popover2.content = p;
		}
	}

	constructor() {
		this.popover2.luPopoverNoCloseButton = true;
	}

	/** how the panel will be aligned with the target, allowed values: top, bottom, left, right
	 * @deprecated prefer using customPositions instead
	 * */
	luDropdownAlignment: LuPopoverAlignment = 'right';

	ngOnInit(): void {
		if (isNil(this.popover2.luPopoverPosition())) {
			this.popover2.luPopoverPositionRef.set('below');
		}
		if (!this.popover2.customPositions || this.popover2.customPositions.length === 0) {
			this.popover2.customPositions = this.legacyPositionBuilder();
		}
	}

	/**********************
	 *
	 * LEGACY STUFF TO HANDLE EXISTING POSITIONS
	 *
	 ***********************/
	private legacyPositionBuilder(): ConnectionPositionPair[] {
		const connectionPosition: OriginConnectionPosition = {
			originX: 'start',
			originY: 'top',
		};

		// Position
		const position = this.popover2.luPopoverPositionRef();
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
		const alignment = this.luDropdownAlignment;
		if (position === 'below' || position === 'above') {
			if (alignment === 'left') {
				connectionPosition.originX = 'start';
			} else if (alignment === 'right') {
				connectionPosition.originX = 'end';
			} else {
				connectionPosition.originX = 'center';
			}
		} else {
			if (alignment === 'top') {
				connectionPosition.originY = 'top';
			} else if (alignment === 'bottom') {
				connectionPosition.originY = 'bottom';
			} else {
				connectionPosition.originY = 'center';
			}
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

		return [
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
		];
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
