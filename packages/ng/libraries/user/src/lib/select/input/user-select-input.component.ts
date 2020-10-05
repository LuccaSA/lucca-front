import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	HostListener,
	TemplateRef,
	ViewChild,
	Input,
	Renderer2,
	HostBinding,
	AfterContentInit,
	Inject,
	AfterViewInit,
	Optional,
	SkipSelf,
	Self
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ALuClearer, ILuClearer, ILuInputDisplayer, ALuInputDisplayer } from '@lucca-front/ng/input';
import { ILuInputWithPicker, ALuPickerPanel } from '@lucca-front/ng/picker';
import { ILuUser } from '../../user.model';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ILuPickerPanel } from '@lucca-front/ng/picker';
import { LuDisplayFullname } from '../../display/index';
import { LuUserSelectInputIntl } from './user-select-input.intl';
import { ILuUserSelectInputLabel } from './user-select-input.translate';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { ALuUserService, LuUserV3Service } from '../../service/index';

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
			provide: ALuUserService,
			useClass: LuUserV3Service,
		},
	],
})
export class LuUserSelectInputComponent<U extends ILuUser = ILuUser>
extends ALuSelectInputComponent<U>
implements ControlValueAccessor, ILuInputWithPicker<U>, AfterViewInit {
	protected _service: LuUserV3Service<U>;

	searchFormat = LuDisplayFullname.lastfirst;

	@Input('placeholder') set inputPlaceholder(p: string) { this._placeholder = p; }

	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	@Input() set operations(operations: number[]) { this._service.operations = operations; }

	@Input() enableFormerEmployees = false;

	byId: LuOptionComparer<U> = (option1: U, option2: U) => option1 && option2 && option1.id === option2.id;

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		@Inject(ALuUserService) @Optional() @SkipSelf() hostService: LuUserV3Service<U>,
		@Inject(ALuUserService) @Self() selfService: LuUserV3Service<U>,
		@Inject(LuUserSelectInputIntl) public intl: ILuUserSelectInputLabel,
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
		this._service = hostService || selfService;
	}


}
