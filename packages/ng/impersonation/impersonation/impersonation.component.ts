import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, model, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca/prisme/button';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { ILuUser, LuUserDisplayPipe, LuUserPictureComponent } from '@lucca-front/ng/user';
import { FormsModule } from '@angular/forms';
import { LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select/user';
import { LuOptionDirective } from '@lucca-front/ng/core-select';

@Component({
	selector: 'lu-impersonation',
	imports: [ButtonComponent, PopoverDirective, FormsModule, LuSimpleSelectInputComponent, LuCoreSelectUsersDirective, LuUserDisplayPipe, LuOptionDirective, LuUserPictureComponent],
	templateUrl: './impersonation.component.html',
	styleUrl: './impersonation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpersonationComponent {
	protected elementRef = inject(ElementRef);

	inputComponentRef = viewChild<LuSimpleSelectInputComponent<ILuUser>>(LuSimpleSelectInputComponent);

	popoverRef = viewChild(PopoverDirective);

	selectedUser = model<ILuUser>();

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'bottom' },
			{
				overlayX: 'start',
				overlayY: 'top',
			},
			-4,
			0,
		),
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'top' },
			{
				overlayX: 'start',
				overlayY: 'bottom',
			},
			-4,
			0,
		),
	];

	constructor() {
		effect(() => {
			const ref = this.inputComponentRef();
			// Because ref appears only when opening the panel, we're going to call the filter pill opened hook too
			if (ref) {
				untracked(() => {
					ref.enableFilterPillMode();
					ref.registerFilterPillClosePopover(this.closePopover);
					ref.registerFilterPillUpdatePosition?.(this.updatePosition);
					ref.onFilterPillOpened?.();
				});
			}
		});
	}

	closePopover = () => {
		this.popoverRef()?.close();
		this.inputComponentRef()?.onFilterPillClosed?.();
	};

	updatePosition = () => {
		this.popoverRef()?.updatePosition();
	};
}
