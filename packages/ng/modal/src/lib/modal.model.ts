import { ILuPopupContent } from '@lucca-front/ng/popup';
import { Observable } from 'rxjs';

export interface ILuModalContent<T> extends ILuPopupContent {
	title: string;
	submitAction?: () => T | Observable<T>;
	submitLabel?: string;
	submitPalette?: string;
	submitDisabled?: boolean;
	submitCounter?: number;
	cancelLabel?: string;
}
