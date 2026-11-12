import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent } from '../../form-field.component';
import { LU_FORM_FIELD_TRANSLATIONS } from '../../form-field.translate';

/**
 * Displays a dash for a missing value, along with a visually hidden text for assistive technologies.
 * Internal: used by data presentation and by form fields in presentation mode.
 */
@Component({
	selector: 'lu-presentation-no-value',
	template: `<span aria-hidden="true" data-content-before="–"></span><span class="pr-u-mask">{{ label() }}</span>`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ɵPresentationNoValueComponent {
	readonly #formField = inject(FormFieldComponent, { optional: true });
	readonly #defaultIntl = getIntl(LU_FORM_FIELD_TRANSLATIONS);

	// Inside a form field, follow its [intl] overrides; standalone (data presentation), use the locale default.
	protected readonly label = computed(() => this.#formField?.intl().noValue ?? this.#defaultIntl.noValue);
}
