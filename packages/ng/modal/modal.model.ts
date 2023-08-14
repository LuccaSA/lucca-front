import { Observable } from 'rxjs';

export interface ILuModalContent<T = unknown> {
	title: string | Observable<string>;
	submitAction?: () => T | Observable<T>;
	submitLabel?: string | Observable<string>;
	submitPalette?: string;
	submitDisabled?: boolean | Observable<boolean>;
	submitCounter?: number | Observable<number>;
	cancelLabel?: string | Observable<string>;
}

export type LuModalContentResult<T extends ILuModalContent> = T extends ILuModalContent<infer R> & { submitAction: unknown } ? R : never;
