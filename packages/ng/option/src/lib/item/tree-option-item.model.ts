import { ILuOptionItem, ALuOptionItem } from './option-item.model';
import { Observable } from 'rxjs';

export interface ILuTreeOptionItem<T = any> extends ILuOptionItem<T> {
	children: this[];
	allChildren: this[];

	onSelectSelf: Observable<this>;
	onSelectChildren: Observable<this>;
}
export abstract class ALuTreeOptionItem<T = any> extends ALuOptionItem<T> implements ILuTreeOptionItem<T> {
	abstract children: this[];
	get allChildren(): this[] {
		return this.children.map((c) => [c, ...c.allChildren]).reduce((aggr, val) => [...aggr, ...val], []);
	}
	abstract onSelectSelf: Observable<this>;
	abstract onSelectChildren: Observable<this>;
}
