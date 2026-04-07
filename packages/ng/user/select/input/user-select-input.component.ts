import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, input, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions } from '@lucca-front/ng/core';
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

	readonly fields = input<string>();

	readonly filters = input<string[]>();

	readonly orderBy = input<string>();

	readonly appInstanceId = input<number | string>();

	readonly operations = input<number[]>();

	readonly enableFormerEmployees = input<boolean>(false);

	readonly disablePrincipal = input<boolean>(false);

	clue = '';

	byId: LuOptionComparer<U> = (option1: U, option2: U) => option1 && option2 && option1.id === option2.id;

	readonly intl = input(...intlInputOptions(LU_USER_SELECT_INPUT_TRANSLATIONS));

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
