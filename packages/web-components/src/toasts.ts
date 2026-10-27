import { EnvironmentInjector } from '@angular/core';
import { LuToast, LuToastInput, LuToastsService } from '@lucca-front/ng/toast';

export function createToastsApi(injector: EnvironmentInjector) {
	const toastsService = injector.get(LuToastsService);

	return {
		/** Same as `LuToastsService.addToast`: adds a `lu-toasts` to the page if it has none */
		add(toast: LuToastInput): LuToast {
			if (!document.querySelector('lu-toasts')) {
				document.body.append(document.createElement('lu-toasts'));
			}
			return toastsService.addToast(toast);
		},
		remove(toast: LuToast): void {
			toastsService.removeToast(toast);
		},
	};
}
