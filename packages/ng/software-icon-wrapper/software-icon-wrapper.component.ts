import { ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, effect, input, ViewEncapsulation } from '@angular/core';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { SoftwareIconComponent, SOFTWARE_ICON_WRAPPER } from '@lucca-front/ng/software-icon';
import { SoftwareIconWrapperButtonMoreComponent } from './software-icon-button-more/software-icon-wrapper-button-more.component';
import { isNotNil } from '../core/misc';
import { PopoverDirective } from '../popover2/popover.directive';

@Component({
	selector: 'lu-software-icon-wrapper',
	templateUrl: './software-icon-wrapper.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [PopoverDirective, SoftwareIconComponent, SoftwareIconWrapperButtonMoreComponent],
	providers: [
		{
			provide: SOFTWARE_ICON_WRAPPER,
			useFactory: (component: SoftwareIconWrapperComponent) => ({
				size: component.size,
			}),
			deps: [SoftwareIconWrapperComponent],
		},
	],
})
export class SoftwareIconWrapperComponent {
	readonly max = input<number | null | undefined>(null);
	readonly size = input<'XXS' | 'XS' | 'S' | 'L' | ''>('');

	protected readonly icons = contentChildren(SoftwareIconComponent);
	protected readonly buttonMore = contentChild(SoftwareIconWrapperButtonMoreComponent);

	readonly hiddenIcons = computed<SoftwareIconComponent[]>(() => {
		const icons = this.icons();
		const max = this.max();
		return max == null || max <= 0 || icons.length <= max ? [] : [...icons].slice(max);
	});

	readonly hiddenCount = computed(() => this.hiddenIcons().length);
	readonly hasButtonMore = computed(() => isNotNil(this.buttonMore()));

	constructor() {
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
