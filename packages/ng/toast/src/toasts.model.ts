export type LuToastType = 'Info' | 'Error' | 'Success' | 'Warning';

export const defaultToastDuration = 5000;

export interface LuToastInput {
	message: string;
	type?: LuToastType;
	/**
	 * Auto kill default duration is 5000ms
	 * Null means manual dismiss only
	 */
	duration?: number | null;
	onClose?: () => void;
}

export interface LuToast extends LuToastInput {
	id: string;
}
