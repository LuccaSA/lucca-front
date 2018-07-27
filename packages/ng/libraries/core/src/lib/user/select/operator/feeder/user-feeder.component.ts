import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../../../../option/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { LuUserFeederService } from './user-feeder.service';
import { IUser } from '../../../user.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

@Component({
	selector: 'lu-user-feeder',
	templateUrl: './user-feeder.component.html',
	styleUrls: ['./user-feeder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuUserFeederComponent),
			multi: true,
		},
	],
})
export class LuUserFeederComponent<U extends IUser = IUser> implements ILuOptionOperator<U>, OnInit {
	outOptions$: Observable<U[]>;
	searchControl = new FormControl('');
	page$ = new BehaviorSubject<number>(0);
	clue$ = merge(of(''), this.searchControl.valueChanges).do(c => this.page$.next(0));

	constructor(protected service: LuUserFeederService<U>) {}

	ngOnInit() {
		this.outOptions$ = combineLatest(this.clue$, this.page$)
		.debounceTime(25)
		.switchMap(([clue, page]) => this.service.search(clue, page).catch(err => of([])));
	}
}
