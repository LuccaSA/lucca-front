import { ILuSidepanelContent } from './sidepanel.model';
import { ILuModalRef, ALuModalRef } from '../modal/index';

export interface ILuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = any, R = any> extends ILuModalRef<T, D, R> {}
export abstract class ALuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = any, R = any> extends ALuModalRef<T, D, R> implements ILuSidepanelRef<T, D, R> {}
