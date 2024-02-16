import { LuDialogRef, LuDialogSelfRef } from './dialog-ref';
import { dialogData, dialogResult } from './dialog-config';
import { inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

export function injectDialogData<TData>(): TData & { [dialogData]: TData } {
	return inject<TData & { [dialogData]: TData }>(DIALOG_DATA);
}

export function injectDialogRef<R = void>(): LuDialogSelfRef<R> & { [dialogResult]: R } {
	return inject<LuDialogSelfRef<R>>(LuDialogRef) as LuDialogSelfRef<R> & { [dialogResult]: R };
}
