import { ComponentType } from '@angular/cdk/portal';
import { ALuPopupRef, ILuPopupRef } from '@lucca-front/ng/popup';
import { LuModalClasses, luModalClasses, LuModalConfig, LuModalMode } from './modal-config.model';
import { ILuModalContent, LuModalContentResult } from './modal.model';

export interface ILuModalRef<D = unknown, R = unknown> extends ILuPopupRef<D, R> {
	mode: LuModalMode;
	modalClasses: LuModalClasses;
}

export interface IModalRefFactory {
	forge<T extends ILuModalContent, C extends LuModalConfig, D>(component: ComponentType<T>, config: C): ILuModalRef<D, LuModalContentResult<T>>;
}

export abstract class ALuModalRef<T extends ILuModalContent = ILuModalContent, D = unknown, R = unknown, C extends LuModalConfig = LuModalConfig>
	extends ALuPopupRef<T, D, R, C>
	implements ILuModalRef<D, R>
{
	public get mode(): LuModalMode {
		return this._config.mode || 'modal';
	}

	public get modalClasses(): LuModalClasses {
		return luModalClasses[this.mode];
	}
}
