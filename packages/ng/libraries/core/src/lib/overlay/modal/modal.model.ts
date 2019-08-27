import { ILuPopupContent } from '../popup/index';
import { Observable } from 'rxjs';

export interface ILuModalContent<T = any> extends ILuPopupContent {
	title: string;
	submitAction?: () => T | Observable<T>;
	submitLabel?: string;
	submitDisabled?: boolean;
	cancelLabel?: string;
	cancelAction?: () => T | Observable<T>;
}
