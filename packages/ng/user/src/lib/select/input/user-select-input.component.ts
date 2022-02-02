import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuDisplayFullname } from '../../display/index';
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
	],
})
export class LuUserSelectInputComponent<U extends import('../../user.model').ILuUser = import('../../user.model').ILuUser>
	extends ALuSelectInputComponent<U>
	implements ControlValueAccessor, ILuInputWithPicker<U>, AfterViewInit
{
	searchFormat = LuDisplayFullname.lastfirst;

	@Input('placeholder') override set inputPlaceholder(p: string) {
		this._placeholder = p;
	}

	@Input() fields: string;
	@Input() filters: string[];
	@Input() orderBy: string;
	@Input() appInstanceId: number | string;
	@Input() operations: number[];
	@Input() enableFormerEmployees = false;

	clue = '';

	byId: LuOptionComparer<U> = (option1: U, option2: U) => option1 && option2 && option1.id === option2.id;

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
		@Inject(LuUserSelectInputIntl) public intl: ILuUserSelectInputLabel,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
	}
}
