import { Observable, of } from 'rxjs';
import { LuModalClasses, LuModalMode } from '../modal-config.model';
import { ILuModalRef } from '../modal-ref.model';
import { ILuModalContent, LuModalContentResult } from '../modal.model';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { map } from 'rxjs/operators';
import { DialogContentAdapterComponent } from './dialog-content-adapter/dialog-content-adapter.component';

export class DialogRefAdapter<D, T extends ILuModalContent> implements ILuModalRef<D, LuModalContentResult<T>> {
	mode: LuModalMode;
	modalClasses: LuModalClasses;

	onOpen: Observable<D> = of(this.dialogRef.instance.dialogData.data);
	onClose: Observable<LuModalContentResult<T>> = this.dialogRef.result$ as Observable<LuModalContentResult<T>>;
	onDismiss: Observable<void> = this.dialogRef.dismissed$;
	onBackdropClick: Observable<void> = this.dialogRef.cdkRef.backdropClick.pipe(map(() => {}));

	constructor(private readonly dialogRef: LuDialogRef<DialogContentAdapterComponent<D, T>>) {}

	open(): void {}

	close(result: LuModalContentResult<T>): void {
		this.dialogRef.close(result);
	}

	dismiss(): void {
		this.dialogRef.dismiss();
	}
}
