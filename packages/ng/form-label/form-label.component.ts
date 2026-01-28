import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { DecorativePalette, intlInputOptions, IntlParamsPipe, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_FORM_LABEL_TRANSLATIONS } from './form-label.translate';

@Component({
	selector: 'lu-form-label',
	styleUrl: './form-label.component.scss',
	templateUrl: './form-label.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, LuTooltipTriggerDirective, LuTooltipTriggerDirective, TagComponent, IconComponent, IntlParamsPipe],
})
export class FormLabelComponent {
	readonly required = input(false, { transform: booleanAttribute });
	readonly presentation = input(false, { transform: booleanAttribute });
	readonly error = input(false, { transform: booleanAttribute });
	readonly tooltip = input<string | SafeHtml | null>(null);
	readonly tag = input<string | null>(null);
	readonly tagPalette = input<Palette | DecorativePalette | null>(null);
	readonly size = input<'XS' | 'S' | null>(null);
	readonly for = input.required<string>();
	readonly labelId = input<string | null>(null);
	readonly counterStatus = input<number>(0);
	readonly counterMax = input<number>(0);
	readonly counterId = input<string | null>(null);

	protected readonly intl = input(...intlInputOptions(LU_FORM_LABEL_TRANSLATIONS));
}
