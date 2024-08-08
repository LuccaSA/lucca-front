import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { ALuModalRef as ALuSidepanelRef, ILuModalContent, ILuModalLabel, ILuModalRef, LU_MODAL_DATA, LuModalConfig, luDefaultSidepanelConfig, luModalTranslations } from '@lucca-front/ng/modal';

/**
 * For backward compatibility, we re-export modal tokens as sidepanel tokens.
 * We should remove all sidepanel related files in the next major version (16+).
 */

/**
 * @deprecated Use LU_MODAL_CONFIG from @lucca-front/ng/modal instead.
 */
export const LU_SIDEPANEL_CONFIG = new InjectionToken<LuSidepanelConfig>('LuSidepanelDefaultConfig', {
	factory: () => luDefaultSidepanelConfig,
});

/**
 * @deprecated Use LU_MODAL_DATA from @lucca-front/ng/modal instead.
 */
export const LU_SIDEPANEL_DATA = LU_MODAL_DATA;

/**
 * @deprecated Use LU_MODAL_TRANSLATIONS from @lucca-front/ng/modal instead.
 */
export const LU_SIDEPANEL_TRANSLATIONS = new InjectionToken('LuSidepanelTranslations', {
	factory: () => luSidepanelTranslations,
});

/**
 * @deprecated Use ILuModalLabel from @lucca-front/ng/modal instead.
 */
export type ILuSidepanelLabel = ILuModalLabel;

/**
 * @deprecated Use luModalTranslations from @lucca-front/ng/modal instead.
 */
export const luSidepanelTranslations: LuTranslation<ILuSidepanelLabel> = luModalTranslations;

/**
 * @deprecated Use LuModalConfig from @lucca-front/ng/modal instead.
 */
export type LuSidepanelConfig = LuModalConfig;

/**
 * @deprecated Use LuModalConfig from @lucca-front/ng/modal instead.
 */
export type ILuSidepanelConfig = LuModalConfig;

/**
 * @deprecated Use ILuModalContent from @lucca-front/ng/modal instead.
 */
export type ILuSidepanelContent<T = unknown> = ILuModalContent<T>;

/**
 * @deprecated Use ILuModalRef from @lucca-front/ng/modal instead.
 */
export type ILuSidepanelRef<D = unknown, R = unknown> = ILuModalRef<D, R>;

export {
	/**
	 * @deprecated Use ALuModalRef from @lucca-front/ng/modal instead.
	 */
	ALuSidepanelRef,
};
