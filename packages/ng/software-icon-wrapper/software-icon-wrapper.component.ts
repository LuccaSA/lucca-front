import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { PopoverDirective } from '../popover2/popover.directive';
import { intlInputOptions, IntlParamsPipe } from '../core/translate';
import { LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS } from './software-icon-wrapper.translate';

@Component({
	selector: 'lu-software-icon-wrapper',
	templateUrl: './software-icon-wrapper.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [PopoverDirective, SoftwareIconComponent, IntlParamsPipe],
})
export class SoftwareIconWrapperComponent {
	readonly max = input(0, { transform: numberAttribute });
	readonly size = input<'XXS' | 'XS' | 'S' | 'L' | ''>('');
	readonly intl = input(...intlInputOptions(LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS));

	protected readonly icons = contentChildren(SoftwareIconComponent);

	readonly hiddenIcons = computed<SoftwareIconComponent[]>(() => {
		const max = this.max();
		const icons = this.icons();
		return max == null || max <= 0 || icons.length <= max ? [] : icons.slice(max);
	});

	readonly hiddenCount = computed(() => this.hiddenIcons().length);

	constructor() {
		effect(() => this.icons().forEach((i) => i.hasParent.set(true)));
		effect(() => this.#toggleIconsVisibility(this.icons(), this.max()));
	}

	#toggleIconsVisibility(icons: readonly SoftwareIconComponent[], max: number | null | undefined) {
		if (max == null || max <= 0) {
			icons.forEach((icon) => icon.hidden.set(false));
			return;
		}

		icons.forEach((icon, index) => icon.hidden.set(index >= max));
	}
}
