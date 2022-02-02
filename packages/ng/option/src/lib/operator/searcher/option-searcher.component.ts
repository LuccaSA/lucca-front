import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
	ViewChild,
	ElementRef,
	HostBinding,
	Inject,
} from '@angular/core';
import { ILuOnOpenSubscriber, ALuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable, combineLatest, merge, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
	selector: 'lu-option-searcher',
	templateUrl: 'option-searcher.component.html',
	styleUrls: ['option-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class LuOptionSearcherComponent<T = any>
	extends ALuOptionOperator<T>
	implements ILuOptionOperator<T>, ILuOnOpenSubscriber
{
	searchControl = new FormControl();
	clue$ = merge(of(''), this.searchControl.valueChanges);
	empty$: Observable<boolean>;
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef;
	outOptions$: Observable<T[]>;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = combineLatest(in$, this.clue$, (options, clue) => {
			return clue
				? (options || []).filter((o) => this.searchFn(o, clue))
				: options || [];
		});
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
