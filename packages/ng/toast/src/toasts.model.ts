export type LuToastType = 'Info' | 'Error' | 'Success' | 'Warning';

export const defaultToastDuration = 5000;

export interface LuToastInput {
	/**
	 * InnerHTML supported.
	 */
	message: string;
	/**
	 * Bold title.
	 * InnerHTML not supported.
	 */
	title?: string;
	type?: LuToastType;
	/**
	 * Auto kill default duration is 5000ms.
	 * Null means manual dismiss only.
	 */
	duration?: number | null;
}

export interface LuToast extends LuToastInput {
	id: string;
}
