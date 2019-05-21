import { ILuPopupContent } from '../popup/index';
import { Observable } from 'rxjs';

export interface ILuModalContent<T = any> extends ILuPopupContent {
	title: string;
	submitAction?: () => Observable<T>;
	submitLabel?: string;
	submitDisabled?: boolean;
}
