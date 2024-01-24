import { LuDialogRef } from './dialog-ref';
import { LuDialogComponent } from './dialog-component';

export type InferredResult<C extends LuDialogComponent> = C extends {
	dialogRef: LuDialogRef<LuDialogComponent, infer R>;
}
	? R
	: void;

export type DialogPartial<C> = keyof C extends never ? never : Partial<Omit<C, 'dialogRef' | 'dialogData'>>;
