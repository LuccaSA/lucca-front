import { ILuOptionPickerPanel, ALuOptionPicker } from '../../../option/index';
import { Observable } from 'rxjs';
import { ILuTreeOptionItem } from '../item/index';
import { switchMap, merge } from 'rxjs/operators';

export interface ILuTreeOptionPickerPanel<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ILuOptionPickerPanel<T, I> {}

export abstract class ALuTreeOptionPicker<T = any, I extends ILuTreeOptionItem<T> = ILuTreeOptionItem<T>> extends ALuOptionPicker<T, I> implements ILuTreeOptionPickerPanel<T, I> {

}
