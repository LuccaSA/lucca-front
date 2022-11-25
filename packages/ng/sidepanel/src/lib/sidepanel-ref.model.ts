import { ALuModalRef, ILuModalRef } from '@lucca-front/ng/modal';
import { ILuSidepanelContent } from './sidepanel.model';
import { LuSidepanelConfig } from './sidepanel-config.model';

export type ILuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = unknown, R = unknown> = ILuModalRef<T, D, R>;
export abstract class ALuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = unknown, R = unknown, C extends LuSidepanelConfig = LuSidepanelConfig>
	extends ALuModalRef<T, D, R, C>
	implements ILuSidepanelRef<T, D, R> {}
