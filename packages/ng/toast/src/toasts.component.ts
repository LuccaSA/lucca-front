import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuToast, LuToastType } from './toasts.model';
import { LuToastsService } from './toasts.service';

@Component({
	selector: 'lu-toasts',
	templateUrl: './toasts.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuToastsComponent {
	public toasts$ = this.toastsService.toasts$;

	constructor(private toastsService: LuToastsService) {}

	public iconClassByToastType: Record<LuToastType, string> = {
		Info: 'icon-info',
		Success: 'icon-success',
		Error: 'icon-error',
		Warning: 'icon-warning',
	}

	public paletteClassByToastType: Record<LuToastType, string> = {
		Info: '',
		Success: 'palette-success',
		Error: 'palette-error',
		Warning: 'palette-warning',
	}

	public removeToast(toast: LuToast): void {
		this.toastsService.removeToast(toast);
	}

	public trackToast(_index: number, toast: LuToast): string {
		return toast.id;
	}
}
