import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	QueryList,
	ViewChildren,
	AfterViewInit,
	Output,
	EventEmitter,
	TemplateRef,
	ContentChild,
} from '@angular/core';
import { ILuOptionItem, ALuOptionItem } from '../../item/index';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { ENTER, UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';

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
	@ContentChild(TemplateRef, { read: TemplateRef }) optionTemplate: TemplateRef<any>;
	@Output() onSelect = new EventEmitter<T>();
	highlightIndex = 0;
	set inOptions$(options$: Observable<T[]>) {
		this.options$ = options$;
	}
	get outOptions$() { return this.options$; }
	options$: Observable<T[]>;

	@ViewChildren(ALuOptionItem) optionsVC: QueryList<ILuOptionItem<T>>;
	ngAfterViewInit() {
		const allOptionsOnSelect$ =
			merge(Observable.of(this.optionsVC), this.optionsVC.changes)
			.map<QueryList<ILuOptionItem<T>>, ILuOptionItem<T>[]>(ql => ql.toArray())
			.map(optionItems => merge(...optionItems.map(oi => oi.onSelect)))
			.mergeMap(val => val);

		allOptionsOnSelect$.subscribe(value => this.onSelect.emit(value));
	}

	// operator events
	onKeydown(keycode: number): void {
		switch (keycode) {
			case ENTER:
				return this.selectHighlight();
			case UP_ARROW:
				return this.highlightPrevious();
			case DOWN_ARROW:
				return this.highlightNext();
			default:
				return this.resetHighlight();
		}
	}
	onClose() {
		this.resetHighlight();
	}

	// highlight
	resetHighlight() {
		this.highlightIndex = 0;
	}
	highlightNext() {
		const optionsCount = this.optionsVC.length;
		this.highlightIndex = Math.min(this.highlightIndex + 1, optionsCount);
	}
	highlightPrevious() {
		this.highlightIndex = Math.max(this.highlightIndex - 1, 0);
	}
	selectHighlight() {
		const highlightedOption = this.optionsVC.toArray()[this.highlightIndex];
		if (!!highlightedOption) {
			const value = highlightedOption.value;
			this.onSelect.emit(value);
		}
	}
	get value() {
		const highlightedOption = this.optionsVC.toArray()[this.highlightIndex];
		return !!highlightedOption ? highlightedOption.value : undefined;
	}
}
