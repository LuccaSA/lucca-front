import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber, ILuTree } from '@lucca-front/ng/core';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';

@Component({
	selector: 'lu-tree-option-searcher',
	templateUrl: './option-searcher.component.html',
	styleUrls: ['./option-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuTreeOptionSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuTreeOptionSearcherComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionSearcherComponent<T> extends ALuTreeOptionOperator<T> implements ILuTreeOptionOperator<T>, ILuOnOpenSubscriber {
	searchControl = new FormControl();
	clue$ = merge(of(''), this.searchControl.valueChanges) as Observable<string>;
	empty$: Observable<boolean>;
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef<HTMLElement>;
	outOptions$: Observable<ILuTree<T>[]>;
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = combineLatest([in$, this.clue$]).pipe(
			map(([options, clue]) => {
				if (!clue) {
					return options || [];
				}
				return this.trim(options, clue);
			}),
		);
		this.empty$ = this.outOptions$.pipe(map((o) => !o || o.length === 0));
	}
	@Input() searchFn: (option: T, clue: string) => boolean = () => true;

	onOpen() {
		this.searchInput.nativeElement.focus();
		this.searchControl.setValue('');
	}
	trim(options: ILuTree<T>[], clue: string): ILuTree<T>[] {
		return options
			.map((option) => {
				if (this.searchFn(option.value, clue)) {
					return { ...option };
				}
				const trimmedChildren = option.children ? this.trim(option.children, clue) : [];
				if (trimmedChildren.length) {
					return { ...option, children: trimmedChildren };
				}
				return undefined;
			})
			.filter((o) => !!o);
	}
	resetClue() {
		this.searchControl.setValue('');
	}
}
