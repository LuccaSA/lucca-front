import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { intlInputOptions, IntlParamsPipe, luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_FORM_LABEL_TRANSLATIONS } from './form-label.translate';
import { FormLabelSize } from './form-label.type';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'label[luFormLabel], legend[luFormLabel]',
	styleUrl: './form-label.component.scss',
	templateUrl: './form-label.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuTooltipTriggerDirective, LuTooltipTriggerDirective, TagComponent, IconComponent, IntlParamsPipe],
	host: {
		class: 'formLabel',
		'[class.mod-counter]': 'counterMax() > 0',
		'[class.mod-XS]': "size() === 'XS'",
		'[class.mod-S]': "size() === 'S'",
		'[class.is-error]': 'error() || (counterMax() > 0 ? counterStatus() > counterMax() : null)',
	},
})
export class FormLabelComponent {
	protected readonly intl = input(...intlInputOptions(LU_FORM_LABEL_TRANSLATIONS));

	/**
	 * Displays a required marker
	 */
	readonly required = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies the error state
	 */
	readonly error = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays an info icon with a tooltip
	 */
	readonly tooltip = input<string | SafeHtml | null>(null);

	/**
	 * Displays a tag next to the label
	 */
	readonly tag = input<string | null>(null);

	/**
	 * Changes the size of the label
	 */
	readonly size = input<FormLabelSize | null>(null);

	/**
	 * Current number of characters, displayed when `counterMax` is set
	 */
	readonly counterStatus = input(0, { transform: luNumberAttribute });

	/**
	 * Maximum number of characters, displays a character counter when greater than 0
	 */
	readonly counterMax = input(0, { transform: luNumberAttribute });

	/**
	 * Id applied to the counter, to reference in the field's `aria-describedby`
	 */
	readonly counterId = input<string | null>(null);
}
