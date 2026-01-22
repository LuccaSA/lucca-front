import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { intlInputOptions, isNotNil, PortalContent, PortalDirective, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { merge, Observable } from 'rxjs';
import { LuToast, LuToastInput, LuToastType } from './toasts.model';
import { LuToastsService } from './toasts.service';
import { LU_TOAST_TRANSLATIONS } from './toasts.translate';

@Component({
	selector: 'lu-toasts',
	templateUrl: './toasts.component.html',
	styleUrl: './toasts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, PortalDirective],
})
export class LuToastsComponent {
	readonly #toastsService = inject(LuToastsService);

	readonly bottom = input(false);
	readonly sources = input<Array<Observable<LuToastInput>>>();

	constructor() {
		ɵeffectWithDeps([this.sources], (sources, onCleanup) => {
			if (isNotNil(sources)) {
				const sub = merge(...sources).subscribe((toast) => this.#toastsService.addToast(toast));

				onCleanup(() => {
					sub.unsubscribe();
				});
			}
		});
	}

	readonly toasts$ = this.#toastsService.toasts$;

	readonly intl = input(...intlInputOptions(LU_TOAST_TRANSLATIONS));

	readonly iconClassByToastType: Record<LuToastType, string> = {
		Info: 'icon-signInfo',
		Success: 'icon-signSuccess',
		Error: 'icon-signError',
		Warning: 'icon-signWarning',
	};

	readonly paletteClassByToastType: Record<LuToastType, string> = {
		Info: '',
		Success: 'palette-success',
		Error: 'palette-error',
		Warning: 'palette-warning',
	};

	isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}

	removeToast(toast: LuToast): void {
		this.#toastsService.removeToast(toast);
	}

	isOnlyDismissibleManually(toast: LuToast): boolean {
		return this.#toastsService.isOnlyDismissibleManually(toast);
	}
}
