import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, computed, input, numberAttribute } from '@angular/core';
import { BubbleIllustration, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { Hx, ICON_TO_ILLUSTRATION } from '../empty-state.type';

@Component({
	selector: 'lu-empty-state-section',
	imports: [PortalDirective, BubbleIllustrationComponent],
	templateUrl: './empty-state-section.component.html',
	styleUrl: './empty-state-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class EmptyStateSectionComponent {
	/** @deprecated use illustration and action */
	readonly icon = input<string | null>(null);
	readonly actionIllustration = computed(() => this.action() || this.icon()?.includes('Action.svg'));

	readonly illustration = input<BubbleIllustration | string | null>(null);
	readonly action = input(false, { transform: booleanAttribute });

	readonly iconOrIllustration = computed(() => {
		if (this.icon()) {
			if (this.icon()?.includes('Success')) {
				return 'thumbUp';
			}
			if (this.icon()?.includes('Error')) {
				return 'error';
			}
			const iconName = this.icon()?.split('/').pop()?.replace('.svg', '').replace('ActionError', '').replace('ActionSuccess', '').replace('Action', '').replace('icon', '');

			return ICON_TO_ILLUSTRATION[iconName];
		}

		return this.illustration();
	});

	/**
	 * Which palette should be used for the empty state section.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<Palette>('none');

	readonly center = input(false, { transform: booleanAttribute });

	/**
	 * The title of the empty state section
	 */
	readonly heading = input<string>();

	/**
	 * The description of the empty state section
	 */
	readonly description = input<PortalContent>();

	/**
	 * Define the aria level of the title
	 */
	readonly hx = input(3, { transform: numberAttribute as (value: Hx | `${Hx}`) => Hx });

	readonly emptyStateClasses = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
