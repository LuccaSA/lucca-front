import { ChangeDetectionStrategy, Component, forwardRef, HostBinding } from '@angular/core';
import { getIntl, ILuTree } from '@lucca-front/ng/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ALuTreeOptionOperator } from '../../operator/index';
import { ALuTreeOptionSelector, ILuTreeOptionSelector } from '../tree-option-selector.model';
import { LU_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.translate';

@Component({
	selector: 'lu-tree-option-select-all',
	templateUrl: './select-all.component.html',
	styleUrls: ['select-all.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuTreeOptionSelectAllComponent),
			multi: true,
		},
		{
			provide: ALuTreeOptionSelector,
			useExisting: forwardRef(() => LuTreeOptionSelectAllComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionSelectAllComponent<T> extends ALuTreeOptionOperator<T> implements ILuTreeOptionSelector<T> {
	multiple = true;
	onSelectValue = new Subject<T | T[]>();
	private _values: T[];

	@HostBinding('class.position-fixed') fixed = true;
	flatOptions: T[];
	outOptions$: Observable<ILuTree<T>[]>;
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = in$.pipe(tap((options) => (this.flatOptions = this.flattenTree(options))));
	}

	public intl = getIntl(LU_OPTION_SELECT_ALL_TRANSLATIONS);

	selectAll() {
		this.onSelectValue.next([...this.flatOptions]);
	}
	deselectAll() {
		this.onSelectValue.next([]);
	}
	setValue(values: T | T[]): void {
		this._values = values as T[];
	}

	private flattenTree(tree: ILuTree<T>[] = []): T[] {
		return tree.map((t) => [t.value, ...this.flattenTree(t.children)]).reduce((agg, cur) => [...agg, ...cur], []);
	}
}
