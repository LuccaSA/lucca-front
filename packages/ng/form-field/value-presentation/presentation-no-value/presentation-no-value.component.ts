import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_FORM_FIELD_TRANSLATIONS } from '../../form-field.translate';

/**
 * Displays a dash for a missing value, along with a visually hidden text for assistive technologies.
 * Internal: used by data presentation and by form fields in presentation mode.
 */
@Component({
	selector: 'lu-presentation-no-value',
	template: `<span aria-hidden="true" data-content-before="–"></span><span class="pr-u-mask">{{ intl.noValue }}</span>`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ɵPresentationNoValueComponent {
	protected readonly intl = getIntl(LU_FORM_FIELD_TRANSLATIONS);
}
