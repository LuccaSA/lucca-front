import { Observable } from 'rxjs';
import { ALuOptionItem, ILuOptionItem } from './option-item.model';

export interface ILuTreeOptionItem<T> extends ILuOptionItem<T> {
	children: this[];
	allChildren: this[];

	onSelectSelf: Observable<this>;
	onSelectChildren: Observable<this>;
}
export abstract class ALuTreeOptionItem<T> extends ALuOptionItem<T> implements ILuTreeOptionItem<T> {
	abstract children: this[];
	get allChildren(): this[] {
		return this.children.map((c) => [c, ...c.allChildren]).reduce((aggr, val) => [...aggr, ...val], []);
	}
	abstract onSelectSelf: Observable<this>;
	abstract onSelectChildren: Observable<this>;
}
