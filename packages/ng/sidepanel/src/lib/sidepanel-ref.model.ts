import { ALuModalRef, ILuModalRef } from '@lucca-front/ng/modal';
import { ILuSidepanelContent } from './sidepanel.model';

export type ILuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = unknown, R = unknown> = ILuModalRef<T, D, R>;
export abstract class ALuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = unknown, R = unknown>
	extends ALuModalRef<T, D, R>
	implements ILuSidepanelRef<T, D, R> {}
