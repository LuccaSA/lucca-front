import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'label[luLabel]',
	templateUrl: './label.component.html',
	styleUrl: './label.component.scss',
	host: {
		class: 'formLabelDemo',
		'[class.is-critical]': 'critical()',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-XS]': 'size() === "XS"',
		'[class.is-disabled]': 'disabled()',
		'[class.mod-fullSize]': 'fullSize()',
	},
	imports: [NgTemplateOutlet, LuTooltipModule, IconComponent, TagComponent],
})
export class LabelComponent {
	critical = input(false, { transform: booleanAttribute });
	required = input(false, { transform: booleanAttribute });
	fullSize = input(false, { transform: booleanAttribute });
	disabled = input(false, { transform: booleanAttribute });
	tag = input<null | string>(null);
	infos = input<null | string>(null);
	infosIconAlt = input<null | string>(null);
	count = input(0, { transform: numberAttribute });
	counterMax = input(0, { transform: numberAttribute });
	counterAlt = input<null | string>(null);
	counterId = input<null | string>(null);
	size = input<null | 'S' | 'XS'>(null);

	counterAltFormatted = computed<string>(() => {
		let formatted = this.counterAlt().toString();
		formatted = formatted.replace('#count#', this.count().toString());
		formatted = formatted.replace('#counterMax#', this.counterMax().toString());
		return formatted;
	});
}
