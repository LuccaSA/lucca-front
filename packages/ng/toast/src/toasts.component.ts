import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy } from '@angular/core';
import { LuToast, LuToastInput, LuToastType } from './toasts.model';
import { LuToastsService } from './toasts.service';
import { merge, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LuToastIntl } from "./toasts.intl";
import { ILuToastLabel } from "./toasts.translate";

@Component({
	selector: 'lu-toasts',
	templateUrl: './toasts.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuToastsComponent implements OnDestroy {
	@Input() public set sources(sources: Array<Observable<LuToastInput>>) {
		merge(...sources)
			.pipe(takeUntil(this.destroy$))
			.subscribe(toast => this.toastsService.addToast(toast));
	}

	public toasts$ = this.toastsService.toasts$;

	private destroy$ = new Subject<void>()

	constructor(
		@Inject(LuToastIntl) public intl: ILuToastLabel,
		private toastsService: LuToastsService
	) {}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

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

	public isOnlyDismissibleManually(toast: LuToast): boolean {
		return this.toastsService.isOnlyDismissibleManually(toast);
	}
}
