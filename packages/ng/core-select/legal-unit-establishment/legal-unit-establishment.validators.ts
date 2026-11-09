import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LuLegalUnitEstablishmentSelection } from './models';

/**
 * `Validators.required` does not work on this value. Angular's `isEmptyInputValue` only tests `null`
 * and a `length`/`size`, and a plain object has neither, so an empty selection validates as filled
 * while the field still shows its asterisk. Use this instead whenever the field is mandatory.
 */
export function luLegalUnitEstablishmentRequired(control: AbstractControl<LuLegalUnitEstablishmentSelection | null>): ValidationErrors | null {
	const value = control.value;
	return (value?.legalUnits?.length ?? 0) + (value?.establishments?.length ?? 0) > 0 ? null : { required: true };
}
