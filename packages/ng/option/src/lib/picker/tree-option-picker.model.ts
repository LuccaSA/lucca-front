import { ILuTreeOptionItem } from '../item/index';
import { ALuOptionPicker, ILuOptionPickerPanel } from './option-picker.model';

export interface ILuTreeOptionPickerPanel<T = any> extends ILuOptionPickerPanel<T> { }

export abstract class ALuTreeOptionPicker<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ALuOptionPicker<T, I> implements ILuTreeOptionPickerPanel<T> {

}
