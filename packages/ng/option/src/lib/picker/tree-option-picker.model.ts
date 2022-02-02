import { ILuTreeOptionItem } from '../item/index';
import { ALuOptionPicker, ILuOptionPickerPanel } from './option-picker.model';

export type ILuTreeOptionPickerPanel<T> = ILuOptionPickerPanel<T>;

export abstract class ALuTreeOptionPicker<T, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>>
	extends ALuOptionPicker<T, I>
	implements ILuTreeOptionPickerPanel<T> {}
