import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LuMultiSelection } from './select.model';

const required = (control: AbstractControl<LuMultiSelection<unknown>>): ValidationErrors | null => {
	if (!control.value || control.value.mode === 'none') {
		return { required: true };
	}
	return null;
};

export const LuMultiSelectionValidators = {
	required,
};
