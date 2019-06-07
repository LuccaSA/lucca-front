import { ILuOptionItem, ALuOptionItem } from '../../../option/index';

export interface ILuTreeOptionItem<T = any> extends ILuOptionItem<T> {
	children: ILuTreeOptionItem<T>[];
	allChildren: ILuTreeOptionItem<T>[];
}
export abstract class ALuTreeOptionItem<T = any>extends ALuOptionItem<T> implements ILuTreeOptionItem<T> {
	abstract children: ILuTreeOptionItem<T>[];
	get allChildren(): ILuTreeOptionItem<T>[] {
		return this.children
		.map(c => [c, ...c.children])
		.reduce((aggr, val) => [...aggr, ...val], []);
	}
}
