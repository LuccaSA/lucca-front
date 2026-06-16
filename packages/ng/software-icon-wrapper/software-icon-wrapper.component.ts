import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, input, numberAttribute, TemplateRef, ViewEncapsulation } from '@angular/core';
import { LU_SOFTWARE_ICON_WRAPPER } from '@lucca-front/ng/software-icon';

import { intlInputOptions, IntlParamsPipe, isNil } from '@lucca-front/ng/core';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS } from './software-icon-wrapper.translate';

@Component({
	selector: 'lu-software-icon-wrapper',
	templateUrl: './software-icon-wrapper.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [PopoverDirective, IntlParamsPipe, NgTemplateOutlet],
	providers: [{ provide: LU_SOFTWARE_ICON_WRAPPER, useValue: true }],
	host: {
		class: 'softwareIconWrapper',
		'[class.mod-XS]': 'size() === "XS"',
		'[class.mod-S]': 'size() === "S"',
	},
})
export class SoftwareIconWrapperComponent {
	readonly max = input(0, { transform: numberAttribute });
	readonly size = input<'XS' | 'S' | ''>('');
	readonly intl = input(...intlInputOptions(LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS));

	protected readonly items = contentChildren(TemplateRef, { descendants: true });

	readonly hiddenIcons = computed<readonly TemplateRef<unknown>[]>(() => {
		return isNil(this.max()) || this.max() <= 0 || this.items().length < this.max() ? [] : this.items().slice(this.max());
	});

	readonly visibleIcons = computed<readonly TemplateRef<unknown>[]>(() => {
		return isNil(this.max()) || this.max() <= 0 || this.items().length < this.max() ? this.items() : this.items().slice(0, this.hiddenCount() > 1 ? this.max() : this.max() + 1);
	});

	readonly hiddenCount = computed(() => this.hiddenIcons().length);
}
