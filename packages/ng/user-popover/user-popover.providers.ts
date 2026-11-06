import { InjectionToken, makeEnvironmentProviders, Signal, TemplateRef } from '@angular/core';
import { ILuUser } from '@lucca-front/ng/user';

export const LU_USER_POPOVER_USER = new InjectionToken<Signal<ILuUser>>('user-popover-user');

export interface LuUserPopoverCustomContentContext {
	$implicit: ILuUser;
}

export const LU_USER_POPOVER_CUSTOM_CONTENT = new InjectionToken<Signal<TemplateRef<LuUserPopoverCustomContentContext> | null>>('user-popover-custom-content');

/**
 * @deprecated no longer needed as user popover uses `luPopover2`
 */
export function provideLuUserPopover() {
	return makeEnvironmentProviders([]);
}
