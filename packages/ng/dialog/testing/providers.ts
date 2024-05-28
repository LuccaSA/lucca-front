import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LuDialogData } from '@lucca-front/ng/dialog';

export function provideLuDialogDataTesting<T = unknown>(data: LuDialogData<T>) {
	return {
		provide: DIALOG_DATA,
		useValue: data,
	};
}
