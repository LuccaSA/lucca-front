import { ILuPopupContent } from '@lucca-front/ng/popup';
import { Observable } from 'rxjs';

export interface ILuModalContent<T = any> extends ILuPopupContent {
	title: string;
	submitAction?: () => T | Observable<T>;
	submitLabel?: string;
	submitDisabled?: boolean;
	cancelLabel?: string;
}
