import { InjectionToken } from '@angular/core';
import { luDefaultModalConfig } from './modal-config.default';
import { LuModalConfig } from './modal-config.model';
import { IModalRefFactory } from './modal-ref.model';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_MODAL_DATA = new InjectionToken<unknown>('LuModalData');
export const LU_MODAL_CONFIG = new InjectionToken<LuModalConfig>('LuModalDefaultConfig', {
	factory: () => luDefaultModalConfig,
});
export const LU_MODAL_REF_FACTORY = new InjectionToken<IModalRefFactory>('LuModalRefFactory');
