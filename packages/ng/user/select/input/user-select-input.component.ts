import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { getIntl } from '@lucca-front/ng/core';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuForOptionsDirective, LuOptionComparer, LuOptionItemComponent, LuOptionPickerAdvancedComponent } from '@lucca-front/ng/option';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuDisplayFullname, LuUserDisplayPipe } from '../../display';
import { LuUserHomonymsComponent } from '../homonyms';
import { LuUserMeOptionDirective } from '../me';
import { LuUserPagedSearcherComponent } from '../searcher';
import { LU_USER_SELECT_INPUT_TRANSLATIONS } from './user-select-input.translate';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with luCustomUsers directive
 */
@Component({
	selector: 'lu-user-select',
	templateUrl: './user-select-input.component.html',
	styleUrl: './user-select-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		OverlayModule,
		ClearComponent,
		LuInputDisplayerDirective,
		LuOptionPickerAdvancedComponent,
		LuUserPagedSearcherComponent,
		LuUserHomonymsComponent,
		LuOptionItemComponent,
		LuOptionPickerAdvancedComponent,
		LuUserMeOptionDirective,
		LuForOptionsDirective,
		LuUserDisplayPipe,
	],
	providers: [
		LuUserDisplayPipe,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuUserSelectInputComponent),
			multi: true,
		},
	],
})
export class LuUserSelectInputComponent<U extends import('../../user.model').ILuUser = import('../../user.model').ILuUser>
	extends ALuSelectInputComponent<U>
	implements ControlValueAccessor, ILuInputWithPicker<U>, AfterViewInit
{
	searchFormat = LuDisplayFullname.lastfirst;

	@Input('placeholder')
	override set inputPlaceholder(p: string) {
		this._placeholder = p;
	}

	@Input() fields: string;
	@Input() filters: string[];
	@Input() orderBy: string;
	@Input() appInstanceId: number | string;
	@Input() operations: number[];
	@Input() enableFormerEmployees = false;
	@Input() disablePrincipal = false;

	clue = '';

	byId: LuOptionComparer<U> = (option1: U, option2: U) => option1 && option2 && option1.id === option2.id;

	public intl = getIntl(LU_USER_SELECT_INPUT_TRANSLATIONS);

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}
}
