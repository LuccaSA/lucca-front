import { ILuPopupRef, ALuPopupRef } from '@lucca-front/ng/popup';
import { ILuModalContent } from './modal.model';

export interface ILuModalRef<T extends ILuModalContent = ILuModalContent, D = any, R = any> extends ILuPopupRef<T, D, R> {}
export abstract class ALuModalRef<T extends ILuModalContent = ILuModalContent, D = any, R = any> extends ALuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {}
