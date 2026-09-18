const NATIVE_FOCUSABLE_SELECTOR = 'input, select, textarea, button';
const INNER_FOCUSABLE_SELECTOR = 'input, select, textarea, button, [tabindex]:not([tabindex="-1"])';

export function focusFirstInvalidControl(formElement: HTMLElement): void {
	// Innermost invalid elements only: an invalid FormGroup wrapper also carries ng-invalid
	const firstInvalid = Array.from(formElement.querySelectorAll<HTMLElement>('.ng-invalid')).find((element) => !element.querySelector('.ng-invalid'));
	if (!firstInvalid) {
		return;
	}

	// Custom form control hosts (e.g. lu-simple-select) carry ng-invalid but are not focusable themselves
	const target = firstInvalid.matches(NATIVE_FOCUSABLE_SELECTOR) ? firstInvalid : firstInvalid.querySelector<HTMLElement>(INNER_FOCUSABLE_SELECTOR);
	if (!target) {
		return;
	}

	target.focus();
	target.scrollIntoView({ block: 'center' });
}
