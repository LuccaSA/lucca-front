import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/core';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LuOptionPlaceholderModule } from '../../placeholder';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';

@Component({
	selector: 'lu-option-searcher',
	templateUrl: 'option-searcher.component.html',
	styleUrls: ['option-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderModule],
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuOptionSearcherComponent),
			multi: true,
		},
	],
})
export class LuOptionSearcherComponent<T> extends ALuOptionOperator<T> implements ILuOptionOperator<T>, ILuOnOpenSubscriber {
	searchControl = new FormControl();
	clue$ = merge(of(''), this.searchControl.valueChanges) as Observable<string>;
	empty$: Observable<boolean>;
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef<HTMLElement>;
	outOptions$: Observable<T[]>;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = combineLatest([in$, this.clue$]).pipe(
			map(([options, clue]) => {
				return clue ? (options || []).filter((o) => this.searchFn(o, clue)) : options || [];
			}),
		);
		this.empty$ = this.outOptions$.pipe(map((o) => !o || o.length === 0));
	}
	@Input() searchFn: (option: T, clue: string) => boolean = () => true;

	onOpen() {
		this.searchInput.nativeElement.focus();
		this.searchControl.setValue('');
	}
	resetClue() {
		this.searchControl.setValue('');
	}
}
