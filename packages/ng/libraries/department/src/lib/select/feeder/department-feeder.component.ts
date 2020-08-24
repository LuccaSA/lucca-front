import { ChangeDetectionStrategy, Component, forwardRef, Input, Optional, SkipSelf, Inject, Self } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ALuDepartmentService, ILuDepartmentService } from './department-feeder.model';
import { LuDepartmentService } from './department-feeder.service';
import { ILuTree } from '@lucca-front/ng/core';
import { ILuDepartment } from '../../department.model';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '@lucca-front/ng/option';

@Component({
	selector: 'lu-department-feeder',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
		{
			provide: ALuDepartmentService,
			useClass: LuDepartmentService,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
	],
})
export class LuDepartmentFeederComponent extends ALuTreeOptionOperator<ILuDepartment>
implements ILuTreeOptionOperator<ILuDepartment>, ILuOnOpenSubscriber {
	outOptions$: Observable<ILuTree<ILuDepartment>[]>;
	protected _out$ = new Subject<ILuTree<ILuDepartment>[]>();
	protected _service: ILuDepartmentService;
	constructor(
		@Inject(ALuDepartmentService) @Optional() @SkipSelf() hostService: ILuDepartmentService,
		@Inject(ALuDepartmentService) @Self() selfService: ILuDepartmentService,
	) {
		super();
		this._service = hostService || selfService;
		this.outOptions$ = this._out$.asObservable();
	}
	onOpen() {
		this._service.getAll().subscribe(trees => this._out$.next(trees));
	}
}
