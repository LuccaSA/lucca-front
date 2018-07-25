import { ControlValueAccessor } from '@angular/forms';
import { ILuPickerPanel } from './picker/input-picker.model';
import { ILuPopoverTrigger } from '../popover/index';

export interface ILuInputWithPicker<TValue = any, TPanel extends ILuPickerPanel<TValue> = ILuPickerPanel<TValue>>
extends ControlValueAccessor, ILuPopoverTrigger<TPanel> {
}
