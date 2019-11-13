import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ViewChild,
	Input,
	Renderer2,
	AfterContentInit,
	Inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel } from '@lucca-front/ng/picker';
import { ALuClearer, ILuClearer, ILuInputDisplayer, ALuInputDisplayer } from '@lucca-front/ng/input';
import { ILuUser } from '../../user.model';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ILuOptionPickerPanel } from '@lucca-front/ng/option';
import { LuDisplayFullname } from '../../display/index';
import { ALuUserPagedSearcherService, LuUserPagedSearcherService } from '../searcher/index';
import { LuUserSelectInputIntl } from './user-select-input.intl';
import { ILuUserSelectInputLabel } from './user-select-input.translate';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-user-select',
	templateUrl: './user-select-input.component.html',
	styleUrls: ['./user-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuUserSelectInputComponent),
			multi: true,
		},
		{
			provide: ALuUserPagedSearcherService,
			useClass: LuUserPagedSearcherService,
		},
	],
})
export class LuUserSelectInputComponent<U extends ILuUser = ILuUser, P extends ILuOptionPickerPanel<U> = ILuOptionPickerPanel<U>>
extends ALuSelectInputComponent<U, P>
implements ControlValueAccessor, ILuInputWithPicker<U>, AfterContentInit {
	searchFormat = LuDisplayFullname.lastfirst;

	@Input('placeholder') set inputPlaceholder(p: string) { this._placeholder = p; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set transformFn(transformFn: (item: any) => U) { this._service.transformFn = transformFn; }
	@Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	@Input() set operations(operations: number[]) { this._service.operations = operations; }

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		protected _service: ALuUserPagedSearcherService<U>,
		@Inject(LuUserSelectInputIntl) public intl: ILuUserSelectInputLabel,
		) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}

	@ViewChild(ALuPickerPanel, { static: true }) set _vcPicker(picker: P) {
		if (!picker) { return; }
		this._picker = picker;
	}
	@ViewChild(ALuClearer, { static: true }) set _vcClearer(clearer: ILuClearer) {
		if (!clearer) { return; }
		this._clearer = clearer;
	}
	@ViewChild(ALuInputDisplayer, { static: true }) set _vcDisplayer(displayer: ILuInputDisplayer<U>) {
		if (!displayer) { return; }
		this.displayer = displayer;
	}
}
