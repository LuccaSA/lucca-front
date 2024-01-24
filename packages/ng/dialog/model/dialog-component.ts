import { LuDialogRef } from './dialog-ref';

export interface LuDialogComponent {
	dialogRef?: LuDialogRef<unknown>;

	dialogData?: unknown;
}
