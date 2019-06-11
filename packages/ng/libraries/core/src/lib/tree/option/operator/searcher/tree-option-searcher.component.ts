import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Observable, combineLatest, merge, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '../../../../option/index';
import { ILuTree } from '../../../tree.model';
@Component({
	selector: 'lu-option-searcher',
	templateUrl: 'option-searcher.component.html',
	styleUrls: ['option-searcher.component.scss'],
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
		// this.outOptions$ = combineLatest(
		// 	in$,
		// 	this.clue$,
		// 	(options, clue) => {
		// 		return !!clue ? (options || []).filter(o => this.searchFn(o, clue)) : options || [];
		// 	}
		// );
	}
	@Input() searchFn: (option: T, clue: string) => boolean = () => true;
	onOpen() {
		this.searchInput.nativeElement.focus();
		this.searchControl.setValue('');
	}
}
