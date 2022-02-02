import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
	Optional,
	SkipSelf,
	Inject,
	Self,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILuTree } from '@lucca-front/ng/core';
import { ILuDepartment } from '../../department.model';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/core';
import {
	ALuTreeOptionOperator,
	ILuTreeOptionOperator,
} from '@lucca-front/ng/option';
import {
	ALuDepartmentService,
	LuDepartmentV3Service,
	ILuDepartmentService,
} from '../../service/index';

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
			useClass: LuDepartmentV3Service,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuDepartmentFeederComponent),
			multi: true,
		},
	],
})
export class LuDepartmentFeederComponent
	extends ALuTreeOptionOperator<ILuDepartment>
	implements ILuTreeOptionOperator<ILuDepartment>, ILuOnOpenSubscriber
{
	inOptions$: Observable<ILuTree<ILuDepartment>[]>;
	outOptions$: Observable<ILuTree<ILuDepartment>[]>;
	protected _out$ = new Subject<ILuTree<ILuDepartment>[]>();
	protected _service: LuDepartmentV3Service;

	@Input() set appInstanceId(appInstanceId: number | string) {
		this._service.appInstanceId = appInstanceId;
	}
	@Input() set operations(operations: number[]) {
		this._service.operations = operations;
	}

	constructor(
		@Inject(ALuDepartmentService)
		@Optional()
		@SkipSelf()
		hostService: ILuDepartmentService,
		@Inject(ALuDepartmentService) @Self() selfService: ILuDepartmentService,
	) {
		super();
		this._service = (hostService || selfService) as LuDepartmentV3Service;
		this.outOptions$ = this._out$.asObservable();
	}
	onOpen() {
		this._service.getTrees().subscribe((trees) => this._out$.next(trees));
	}
}
