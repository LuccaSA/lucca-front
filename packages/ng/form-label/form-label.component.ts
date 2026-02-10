import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_FORM_LABEL_TRANSLATIONS } from './form-label.translate';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'label[luFormLabel], legend[luFormLabel]',
	styleUrl: './form-label.component.scss',
	templateUrl: './form-label.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, LuTooltipTriggerDirective, LuTooltipTriggerDirective, TagComponent, IconComponent, IntlParamsPipe],
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

	readonly required = input(false, { transform: booleanAttribute });
	readonly error = input(false, { transform: booleanAttribute });
	readonly tooltip = input<string | SafeHtml | null>(null);
	readonly tag = input<string | null>(null);
	readonly size = input<'XS' | 'S' | null>(null);
	readonly counterStatus = input(0, { transform: numberAttribute });
	readonly counterMax = input(0, { transform: numberAttribute });
	readonly counterId = input<string | null>(null);
}
