import { Directive, inject, Input, input } from '@angular/core';
import { ILuUser } from '../../../user/user.model';
import { PopoverDirective } from '../../../popover2/popover.directive';
import { LU_USER_POPOVER_USER, USER_POPOVER_IS_ACTIVATED } from '../../user-popover.providers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LuUserPopoverComponent } from './user-popover.component';

@Directive({
	selector: '[luUserPopover]',
	host: {
		'[attr.aria-expanded]': 'opened()',
	},
	standalone: true,
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
