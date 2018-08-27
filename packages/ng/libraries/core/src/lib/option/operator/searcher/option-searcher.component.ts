import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'lu-option-searcher',
	templateUrl: 'option-searcher.component.html',
	styleUrls: ['searcher.common.scss', 'option-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionSearcherComponent),
			multi: true,
		},
	],
})
export class LuOptionSearcherComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionOperator<T> {
	searchControl = new FormControl();
	clue$ = merge(of(''), this.searchControl.valueChanges);
	@ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = combineLatest(
			in$,
			this.clue$,
			(options, clue) => {
				return !!clue ? (options || []).filter(o => this.searchFn(o, clue)) : options || [];
			}
		);
	}
	@Input() searchFn: (option: T, clue: string) => boolean = () => true;
	onOpen() {
		this.searchInput.nativeElement.focus();
	}
	onClose() {
		this.searchControl.setValue('');
	}
}
