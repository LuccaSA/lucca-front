import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	HostBinding,
	Inject,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
	ALuTreeOptionSelector,
	ILuTreeOptionSelector,
} from '../tree-option-selector.model';
import { tap } from 'rxjs/operators';
import { ALuTreeOptionOperator } from '../../operator/index';
import { ILuOptionSelectAllLabel } from './select-all.translate';
import { LuOptionSelectAllIntl } from './select-all.intl';
import { ILuTree } from '@lucca-front/ng/core';
@Component({
	selector: 'lu-tree-option-select-all',
	templateUrl: './select-all.component.html',
	styleUrls: ['select-all.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class LuTreeOptionSelectAllComponent<T = any>
	extends ALuTreeOptionOperator<T>
	implements ILuTreeOptionSelector<T>
{
	multiple = true;
	onSelectValue = new Subject<T | T[]>();
	private _values: T[];

	@HostBinding('class.position-fixed') fixed = true;
	flatOptions: T[];
	outOptions$: Observable<ILuTree<T>[]>;
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = in$.pipe(
			tap((options) => (this.flatOptions = this.flattenTree(options))),
		);
	}

	constructor(
		@Inject(LuOptionSelectAllIntl) public intl: ILuOptionSelectAllLabel,
	) {
		super();
	}

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
		return tree
			.map((t) => [t.value, ...this.flattenTree(t.children)])
			.reduce((agg, cur) => [...agg, ...cur], []);
	}
}
