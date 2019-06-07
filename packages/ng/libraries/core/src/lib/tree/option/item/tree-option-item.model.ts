import { ILuOptionItem, ALuOptionItem } from '../../../option/index';

export interface ILuTreeOptionItem<T = any> extends ILuOptionItem<T> {
	childrenOptionItems: ILuOptionItem<T>[];
}
export abstract class ALuTreeOptionItem<T = any>extends ALuOptionItem<T> implements ILuTreeOptionItem<T> {
	abstract childrenOptionItems: ILuOptionItem<T>[];
}
