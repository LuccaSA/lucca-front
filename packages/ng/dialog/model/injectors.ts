import { LuDialogRef, LuDialogSelfRef } from './dialog-ref';
import { ɵDialogDataFlag, ɵDialogResultFlag } from './dialog-config';
import { inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

export function injectDialogData<TData>(): TData & ɵDialogDataFlag {
	return inject<TData & ɵDialogDataFlag>(DIALOG_DATA);
}

export function injectDialogRef<R = void>(): LuDialogSelfRef<R> & ɵDialogResultFlag<R> {
	return inject<LuDialogSelfRef<R>>(LuDialogRef) as LuDialogSelfRef<R> & ɵDialogResultFlag<R>;
}
