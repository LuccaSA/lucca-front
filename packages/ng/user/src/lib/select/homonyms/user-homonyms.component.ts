import { ChangeDetectionStrategy, Component, forwardRef, Inject, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { merge, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ILuUser } from '../../user.model';
import { ALuUserHomonymsService, ILuUserHomonymsService, LuUserHomonymsService } from './user-homonyms.service';

@Component({
	selector: 'lu-user-homonyms',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
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
