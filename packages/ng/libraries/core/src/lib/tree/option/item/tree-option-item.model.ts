import { ILuOptionItem, ALuOptionItem } from '../../../option/index';
import { Observable } from 'rxjs';

export interface ILuTreeOptionItem<T = any> extends ILuOptionItem<T> {
	children: ILuTreeOptionItem<T>[];
	allChildren: ILuTreeOptionItem<T>[];

	onSelectSelf: Observable<this>;
	onSelectChildren: Observable<this>;
}
export abstract class ALuTreeOptionItem<T = any>extends ALuOptionItem<T> implements ILuTreeOptionItem<T> {
	abstract children: ILuTreeOptionItem<T>[];
	get allChildren(): ILuTreeOptionItem<T>[] {
		return this.children
		.map(c => [c, ...c.children])
		.reduce((aggr, val) => [...aggr, ...val], []);
	}
	abstract onSelectSelf: Observable<this>;
	abstract onSelectChildren: Observable<this>;
}
