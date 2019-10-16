import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ATreeLuOptionSelector, ILuTreeOptionSelector } from '../tree-option-selector.model';
import { tap } from 'rxjs/operators';
import { ALuTreeOptionOperator } from '../../operator/tree-option-operator.model';
import { ILuTreeOptionSelectAllLabel } from './select-all.translate';
import { LuTreeOptionSelectAllIntl } from './select-all.intl';
import { ILuTree } from '../../../tree.model';
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
			provide: ATreeLuOptionSelector,
			useExisting: forwardRef(() => LuTreeOptionSelectAllComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionSelectAllComponent<T = any> extends ALuTreeOptionOperator<T> implements ILuTreeOptionSelector<T> {
	multiple = true;
	onSelectValue = new Subject<T | T[]>();
	private _values: T[];

	@HostBinding('class.position-fixed') fixed = true;
	options;
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = in$.pipe(
			tap(options => this.options = options)
		);
	}

	constructor(
		@Inject(LuTreeOptionSelectAllIntl) public intl: ILuTreeOptionSelectAllLabel,
	) {
		super();
	}

	selectAll() {
		this.onSelectValue.next([...this.options]);
	}
	deselectAll() {
		this.onSelectValue.next([]);
	}
	setValue(values: T | T[]): void {
		this._values = values as T[];
	}
}
