import { ALuPopupRef, ILuPopupRef } from '@lucca-front/ng/popup';
import { LuModalClasses, luModalClasses, LuModalConfig, LuModalMode } from './modal-config.model';
import { ILuModalContent } from './modal.model';

export interface ILuModalRef<T extends ILuModalContent = ILuModalContent, D = unknown, R = unknown> extends ILuPopupRef<T, D, R> {
	mode: LuModalMode;
	modalClasses: LuModalClasses;
}
export abstract class ALuModalRef<T extends ILuModalContent = ILuModalContent, D = unknown, R = unknown, C extends LuModalConfig = LuModalConfig>
	extends ALuPopupRef<T, D, R, C>
	implements ILuModalRef<T, D, R>
{
	public get mode(): LuModalMode {
		return this._config.mode || 'modal';
	}

	public get modalClasses(): LuModalClasses {
		return luModalClasses[this.mode];
	}
}
