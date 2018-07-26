import { ChangeDetectionStrategy, Component, forwardRef, QueryList, ViewChildren, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ILuOptionItem, ALuOptionItem } from '../../item/index';
import { ILuOptionOperator, ALuOptionOperator, ALuOptionProvider, ILuOptionProvider } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'lu-option-template',
	templateUrl: './option-template.component.html',
	styleUrls: ['./option-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionTemplateComponent),
			multi: true,
		},
		{
			provide: ALuOptionItem,
			useExisting: forwardRef(() => LuOptionTemplateComponent),
			multi: true,
		},
	],
})
export class LuOptionTemplateComponent<T = any> implements ILuOptionOperator<T>, ILuOptionItem<T>, AfterViewInit {
	@Output() onSelect = new EventEmitter<T>();
	set inOptions$(options$: Observable<T[]>) {
		this.options$ = options$;
	}
	get outOptions$() { return this.options$; }
	options$: Observable<T[]>;
	// luOptions$: Observable<ILuOptionItem<T>[]>;

	@ViewChildren(ALuOptionItem) optionsVC: QueryList<ILuOptionItem<T>>;
	ngAfterViewInit() {
		const allOptionsOnSelect$ =
			merge(Observable.of(this.optionsVC), this.optionsVC.changes)
			.map<QueryList<ILuOptionItem<T>>, ILuOptionItem<T>[]>(ql => ql.toArray())
			.map(optionItems => merge(...optionItems.map(oi => oi.onSelect)))
			.mergeMap(val => val);

		allOptionsOnSelect$.subscribe(value => this.onSelect.emit(value));
	}
}
