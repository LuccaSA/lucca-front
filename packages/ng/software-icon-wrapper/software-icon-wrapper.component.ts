import { ChangeDetectionStrategy, Component, computed, contentChildren, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { intlInputOptions, IntlParamsPipe } from '../core/translate';
import { PopoverDirective } from '../popover2/popover.directive';
import { LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS } from './software-icon-wrapper.translate';

@Component({
	selector: 'lu-software-icon-wrapper',
	templateUrl: './software-icon-wrapper.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [PopoverDirective, SoftwareIconComponent, IntlParamsPipe],
	host: {
		class: 'softwareIconWrapper',
		'[class.mod-XXS]': 'size() === "XXS"',
		'[class.mod-XS]': 'size() === "XS"',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-L]': 'size() === "L"',
	},
})
export class SoftwareIconWrapperComponent {
	readonly max = input(0, { transform: numberAttribute });
	readonly size = input<'XXS' | 'XS' | 'S' | 'L' | ''>('');
	readonly intl = input(...intlInputOptions(LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS));

	// TODO
	protected readonly icons = contentChildren(SoftwareIconComponent);

	readonly hiddenIcons = computed<SoftwareIconComponent[]>(() => {
		const max = this.max();
		const icons = this.icons();
		return max == null || max <= 0 || icons.length <= max ? [] : icons.slice(max);
	});

	readonly hiddenCount = computed(() => this.hiddenIcons().length);
}
