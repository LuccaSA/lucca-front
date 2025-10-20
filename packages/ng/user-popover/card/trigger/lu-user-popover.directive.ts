import { Directive, inject, Input, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ILuUser } from '@lucca-front/ng/user';
import { LU_USER_POPOVER_USER, USER_POPOVER_IS_ACTIVATED } from '../../user-popover.providers';
import { LuUserPopoverComponent } from './user-popover.component';

@Directive({
	selector: '[luUserPopover]',
	host: {
		'[attr.aria-expanded]': 'opened()',
	},
	exportAs: 'LuUserPopoverDirective',
})
export class LuUserPopoverDirective extends PopoverDirective {
	luUserPopover = input.required<ILuUser>();

	@Input()
	set luUserPopoverDisabled(disabled: boolean) {
		this.luPopoverDisabled = disabled;
	}

	override additionalProviders = [{ provide: LU_USER_POPOVER_USER, useValue: this.luUserPopover }];

	constructor() {
		super();
		// Default to disabled to avoid having it flicker or something
		this.luPopoverDisabled = false;
		inject(USER_POPOVER_IS_ACTIVATED)
			.pipe(takeUntilDestroyed())
			.subscribe((isActivated) => {
				this.luPopoverDisabled = !isActivated;
			});
		this.customPositions = [
			{ overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
			{ overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom' },
		];

		this.luPopoverTrigger.set('hover+focus');
		this.luPopoverNoCloseButton = true;
		this.content = LuUserPopoverComponent;
	}
}
