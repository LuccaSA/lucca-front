import { Observable } from 'rxjs';

export interface ILuModalContent<T = unknown> {
	title: string | Observable<string>;
	submitAction?: () => T | Observable<T>;
	submitLabel?: string | Observable<string>;
	submitPalette?: string;
	submitDisabled?: boolean;
	submitCounter?: number;
	cancelLabel?: string | Observable<string>;
}
