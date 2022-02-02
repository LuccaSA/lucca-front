import { Observable } from 'rxjs';

export interface ILuModalContent<T = unknown> {
	title: string;
	submitAction?: () => T | Observable<T>;
	submitLabel?: string;
	submitPalette?: string;
	submitDisabled?: boolean;
	submitCounter?: number;
	cancelLabel?: string;
}
