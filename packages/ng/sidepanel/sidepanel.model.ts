import { ALuModalRef as ALuSidepanelRef, ILuModalRef, LU_MODAL_DATA } from '@lucca-front/ng/modal';

/**
 * For backward compatibility, we re-export modal tokens as sidepanel tokens.
 * We should remove all sidepanel related files in the next major version (16+).
 */

/**
 * @deprecated Use LU_MODAL_DATA from @lucca-front/ng/modal instead.
 */
export const LU_SIDEPANEL_DATA = LU_MODAL_DATA;

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
