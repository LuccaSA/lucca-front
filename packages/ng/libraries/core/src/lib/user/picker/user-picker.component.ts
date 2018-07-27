import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewEncapsulation,
	ContentChildren,
	AfterContentInit,
	QueryList,
	Output,
	EventEmitter,
	OnDestroy,
	forwardRef,
	AfterViewInit,
	ViewChildren,
} from '@angular/core';
import { luTransformPopover } from '../../popover/index';
import { ALuPickerPanel } from '../../input/index';
import { ALuOptionOperator, ILuOptionOperator, ILuOptionItem, ALuOptionItem, LuOptionPickerComponent } from '../../option/index';
import { ILuUserPickerPanel } from './user-picker.model';
import { IUser } from '../user.model';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-user-picker',
	templateUrl: './user-picker.component.html',
	styleUrls: ['./user-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuUserPicker',
	providers: [
		{
			provide: ALuPickerPanel,
			useExisting: forwardRef(() => LuUserPickerComponent),
		},
	]
})
export class LuUserPickerComponent<U extends IUser = IUser>
extends LuOptionPickerComponent<U>
implements ILuUserPickerPanel<U>, OnDestroy, AfterContentInit {
	@Output() onSelectValue = new EventEmitter<U>();
	@ViewChildren(ALuOptionItem) optionsQL: QueryList<ILuOptionItem<U>>;
	@ViewChildren(ALuOptionOperator) operatorsQL: QueryList<ILuOptionOperator<U>>;
	constructor(
		protected _elementRef: ElementRef,
	) {
		super(_elementRef);
	}


	// debug
	bob = { id: 12, firstName: 'bob', lastName: 'sponge' } as IUser;
}
