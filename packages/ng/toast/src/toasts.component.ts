import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LuToast, LuToastInput, LuToastType } from './toasts.model';
import { LuToastsService } from './toasts.service';
import { LU_TOAST_TRANSLATIONS } from './toasts.translate';

@Component({
	selector: 'lu-toasts',
	templateUrl: './toasts.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
})
export class LuToastsComponent implements OnDestroy {
	@Input() public bottom = false;
	@Input() public set sources(sources: Array<Observable<LuToastInput>>) {
		merge(...sources)
			.pipe(takeUntil(this.destroy$))
			.subscribe((toast) => this.toastsService.addToast(toast));
	}

	public toasts$ = this.toastsService.toasts$;

	private destroy$ = new Subject<void>();

	public intl = getIntl(LU_TOAST_TRANSLATIONS);

	constructor(private toastsService: LuToastsService) {}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public iconClassByToastType: Record<LuToastType, string> = {
		Info: 'icon-lucca',
		Success: 'icon-confirm',
		Error: 'icon-error',
		Warning: 'icon-warning',
	};

	public paletteClassByToastType: Record<LuToastType, string> = {
		Info: '',
		Success: 'palette-success',
		Error: 'palette-error',
		Warning: 'palette-warning',
	};

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
