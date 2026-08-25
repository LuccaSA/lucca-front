import { ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { luNumberAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_MAIN_LAYOUT_INSTANCE } from '@lucca-front/ng/main-layout';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Hx, HxStyle } from '../empty-state.type';

const DEFAULT_TOP_RIGHT_BACKGROUND = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg';
const DEFAULT_TOP_RIGHT_FOREGROUND = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg';
const DEFAULT_BOTTOM_LEFT_BACKGROUND = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg';
const DEFAULT_BOTTOM_LEFT_FOREGROUND = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg';

@Component({
	selector: 'lu-empty-state-page',
	imports: [PortalDirective, LuSafeExternalSvgPipe],
	templateUrl: './empty-state-page.component.html',
	styleUrl: './empty-state-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'emptyState-wrapper',
	},
})
export class EmptyStatePageComponent {
	readonly #mainLayout = inject(LU_MAIN_LAYOUT_INSTANCE, { optional: true });

	/**
	 * Icon image (URL)
	 */
	readonly icon = input<string | null>(null);

	/**
	 * Top right background image (URL). Defaults to none if unset and nested in a lu-main-layout
	 * that already displays an illustration in that corner (illustrationStartEnd).
	 */
	readonly topRightBackground = input<string | null>();

	/**
	 * Top right foreground image (URL). Defaults to none if unset and nested in a lu-main-layout
	 * that already displays an illustration in that corner (illustrationStartEnd).
	 */
	readonly topRightForeground = input<string | null>();

	/**
	 * Bottom left background image (URL). Defaults to none if unset and nested in a lu-main-layout
	 * that already displays an illustration in that corner (illustrationEndStart).
	 */
	readonly bottomLeftBackground = input<string | null>();

	/**
	 * Bottom left foreground image (URL). Defaults to none if unset and nested in a lu-main-layout
	 * that already displays an illustration in that corner (illustrationEndStart).
	 */
	readonly bottomLeftForeground = input<string | null>();

	readonly resolvedTopRightBackground = computed(() => this.#resolveIllustration(this.topRightBackground(), DEFAULT_TOP_RIGHT_BACKGROUND, this.#mainLayout?.bubblesIllustrationStartEnd()));
	readonly resolvedBottomLeftBackground = computed(() => this.#resolveIllustration(this.bottomLeftBackground(), DEFAULT_BOTTOM_LEFT_BACKGROUND, this.#mainLayout?.bubblesIllustrationEndStart()));

	readonly resolvedTopRightForeground = computed(() => this.#resolveIllustration(this.topRightForeground(), DEFAULT_TOP_RIGHT_FOREGROUND, this.#mainLayout?.illustrationStartEndUrl()));
	readonly resolvedBottomLeftForeground = computed(() => this.#resolveIllustration(this.bottomLeftForeground(), DEFAULT_BOTTOM_LEFT_FOREGROUND, this.#mainLayout?.illustrationEndStartUrl()));

	#resolveIllustration(explicitValue: string | null | undefined, defaultValue: string, conflictingMainLayoutIllustration: string | number | null | undefined): string | null {
		if (explicitValue !== undefined) {
			return explicitValue;
		}
		return conflictingMainLayoutIllustration ? null : defaultValue;
	}

	/**
	 * Background color for content (text)
	 */
	readonly contentBackgroundColor = input<string>('var(--pr-t-elevation-surface-default)');

	/**
	 * Add content above heading
	 */
	readonly slotTop = input<PortalContent>();

	/**
	 * Add illustration beside content
	 */
	readonly illustration = input<PortalContent>();

	readonly heading = input<string>();

	readonly description = input<PortalContent>();

	readonly hx = input(1, { transform: luNumberAttribute<Hx> });

	readonly hxStyle = input(1, { transform: luNumberAttribute<HxStyle> });

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
