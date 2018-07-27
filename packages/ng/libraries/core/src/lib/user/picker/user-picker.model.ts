import { ILuPickerPanel } from '../../input/index';
import { IUser } from '../user.model';

export interface ILuUserPickerPanel<U extends IUser = IUser> extends ILuPickerPanel<U> {}
