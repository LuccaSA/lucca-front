import { ILuOptionItem, ALuOptionItem } from '../../../option/index';

export interface ILuTreeOptionItem<T = any> extends ILuOptionItem<T> {
}
export abstract class ALuTreeOptionItem<T = any>extends ALuOptionItem<T> implements ILuTreeOptionItem<T> {
}
