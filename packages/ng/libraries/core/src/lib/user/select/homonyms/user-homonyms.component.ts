import { ChangeDetectionStrategy, Component, forwardRef, SkipSelf, Self, Optional, Inject, OnInit } from '@angular/core';
import { ALuOptionOperator, ILuOptionOperator} from '../../../option/index';
import { IUser } from '../../user.model';
import { merge } from 'rxjs/operators';

@Component({
	selector: 'lu-user-homonyms',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuUserHomonymsComponent),
			multi: true,
		},
		// {
		// 	provide: ALuUserPagedSearcherService,
		// 	useClass: LuUserPagedSearcherService,
		// },
	],
})
export class LuUserHomonymsComponent<U extends IUser = IUser> implements ILuOptionOperator<U> {
	set inOptions$(in$) {
		this._rawIn$ = in$;
		this._outOptions$ = merge(
			this._rawIn$,
			// this._rawIn$.pipe()
		);
	}
	private _rawIn$;
	private _outOptions$;
	get outOptions$() {
		return this._outOptions$;
	}
	constructor(
		// @Inject(ALuUserPagedSearcherService) @Optional() @SkipSelf() hostService: ALuUserPagedSearcherService,
		// @Inject(ALuUserPagedSearcherService) @Self() selfService: ALuUserPagedSearcherService,
	) {
	}
}

