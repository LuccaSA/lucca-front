import { ALuPopupRef, ILuPopupRef } from '@lucca-front/ng/popup';
import { ILuModalContent } from './modal.model';

export type ILuModalRef<T extends ILuModalContent = ILuModalContent, D = unknown, R = unknown> = ILuPopupRef<T, D, R>;
export abstract class ALuModalRef<T extends ILuModalContent = ILuModalContent, D = unknown, R = unknown> extends ALuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {}
