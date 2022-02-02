import { ChangeDetectionStrategy, Component, forwardRef, SkipSelf, Self, Optional, Inject } from '@angular/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { ILuUser } from '../../user.model';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { ALuUserHomonymsService, LuUserHomonymsService, ILuUserHomonymsService } from './user-homonyms.service';
import { merge, Observable } from 'rxjs';

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
		{
			provide: ALuUserHomonymsService,
			useClass: LuUserHomonymsService,
		},
	],
})
export class LuUserHomonymsComponent<U extends ILuUser = ILuUser> implements ILuOptionOperator<U> {
	set inOptions$(in$: Observable<U[]>) {
		this._outOptions$ = merge(
			in$,
			in$.pipe(
				map((users) => this._service.extractHomonyms(users)),
				switchMap((homonyms: U[]) => this._service.enrichHomonyms(homonyms)),
				withLatestFrom(in$),
				map<[U[], U[]], U[]>(([enrichedUsers, users]) => {
					const result = [...users];
					enrichedUsers.forEach((user) => {
						const i = result.findIndex((u) => u.id === user.id);
						result[i] = user;
					});
					return result;
				}),
			),
		);
	}
	private _outOptions$: Observable<U[]>;
	get outOptions$() {
		return this._outOptions$;
	}
	private _service: ILuUserHomonymsService<U>;
	constructor(
		@Inject(ALuUserHomonymsService)
		@Optional()
		@SkipSelf()
		hostService: ILuUserHomonymsService<U>,
		@Inject(ALuUserHomonymsService)
		@Self()
		selfService: ILuUserHomonymsService<U>,
	) {
		this._service = hostService || selfService;
	}
}
