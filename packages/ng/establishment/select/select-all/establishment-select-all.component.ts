import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, Input, OnDestroy, Optional, Self } from '@angular/core';
import { ALuOptionOperator, ALuOptionSelector, LuOptionSelectAllComponent } from '@lucca-front/ng/option';
import { Subscription } from 'rxjs';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { DEFAULT_ESTABLISHMENT_SERVICE } from '../establishment-select.token';

@Component({
	selector: 'lu-establishment-select-all',
	templateUrl: './establishment-select-all.component.html',
	styleUrls: ['establishment-select-all.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuEstablishmentSelectAllComponent),
			multi: true,
		},
		{
			provide: ALuOptionSelector,
			useExisting: forwardRef(() => LuEstablishmentSelectAllComponent),
			multi: true,
		},
		{
			provide: DEFAULT_ESTABLISHMENT_SERVICE,
			useClass: LuEstablishmentService,
		},
	],
})
export class LuEstablishmentSelectAllComponent extends LuOptionSelectAllComponent<ILuEstablishment> implements OnDestroy {
	@Input() set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set appInstanceId(appInstanceId: number) {
		this._service.appInstanceId = appInstanceId;
	}
	@Input() set operations(operations: number[]) {
		this._service.operations = operations;
	}

	loading = false;
	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	constructor(
		private readonly _changeDetectorRef: ChangeDetectorRef,
		@Inject(ALuEstablishmentService)
		@Optional()
		customService: LuEstablishmentService,
		@Inject(DEFAULT_ESTABLISHMENT_SERVICE)
		@Self()
		defaultService: LuEstablishmentService,
	) {
		super();
		this._service = customService || defaultService;
	}

	override selectAll() {
		this.loading = true;
		const sub = this._service.getAll().subscribe({
			next: (establishments) => {
				this.onSelectValue.next([...establishments]);
			},
			complete: () => {
				this.loading = false;
				this._changeDetectorRef.detectChanges();
			},
		});

		this._subs.add(sub);
	}

	ngOnDestroy(): void {
		this._subs.unsubscribe();
	}
}
