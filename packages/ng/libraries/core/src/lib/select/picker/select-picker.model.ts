import { ILuPopoverPanel } from '../../popover/index';
import { Observable } from 'rxjs/observable';

export interface ILuSelectPickerPanel<T = any> extends ILuPopoverPanel {
	onSelect: Observable<T>;
}
