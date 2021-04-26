import { ILuOptionPickerPanel, ALuOptionPicker } from './option-picker.model';
import { ILuTreeOptionItem } from '../item/index';

export interface ILuTreeOptionPickerPanel<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ILuOptionPickerPanel<T, I> {}

export abstract class ALuTreeOptionPicker<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ALuOptionPicker<T, I> implements ILuTreeOptionPickerPanel<T, I> {

}
