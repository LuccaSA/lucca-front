import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Observable, combineLatest, merge, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '../../../../option/index';
import { ILuTree } from '../../../tree.model';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'lu-tree-option-searcher',
	templateUrl: './tree-option-searcher.component.html',
	styleUrls: ['./tree-option-searcher.component.scss'],
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
export class LuTreeOptionSearcherComponent<T = any> extends ALuTreeOptionOperator<T> implements ILuTreeOptionOperator<T>, ILuOnOpenSubscriber {
	@HostBinding('class.position-fixed') fixed = true;
	searchControl = new FormControl();
	clue$ = merge(of(''), this.searchControl.valueChanges);
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = combineLatest(
			in$,
			this.clue$,
			(options, clue) => {
				if (!clue) {
					return options || [];
				}
				return this.trim(options, clue);
			}
		).pipe(
			tap(o => o),
		);
	}
	@Input() searchFn: (option: T, clue: string) => boolean = () => true;
	onOpen() {
		this.searchInput.nativeElement.focus();
		this.searchControl.setValue('');
	}
	trim(options: ILuTree<T>[], clue: string): ILuTree<T>[] {
		return options.map(option => {
			if (this.searchFn(option.value, clue)) {
				return { ...option };
			}
			const trimmedChildren = option.children ? this.trim(option.children, clue) : [];
			if (trimmedChildren.length) {
				return { ...option, children: trimmedChildren };
			}
			return undefined;
		}).filter(o => !!o);
	}
}
