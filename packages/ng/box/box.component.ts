import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions, luBooleanAttribute, luNumberAttribute, luOptionalNumberAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { HighlightDataBubble, HighlightDataIllustration } from '@lucca-front/ng/highlight-data';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LU_BOX_TRANSLATIONS } from './box.translate';
import { BoxHx, BoxTheme } from './box.type';

@Component({
	selector: 'lu-box',
	templateUrl: './box.component.html',
	styleUrl: './box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, ButtonComponent, BubbleIconComponent, PortalDirective, LuSafeExternalSvgPipe],
	host: {
		class: 'box',
		'[class.mod-toggle]': 'toggle()',
		'[class.mod-neutral]': 'neutral() || theme() === "neutral"',
		'[class.mod-sunken]': 'theme() === "sunken"',
		'[class.mod-fancyLight]': 'theme() === "fancyLight"',
		'[class.mod-fancyDark]': 'theme() === "fancyDark"',
		'[class.mod-withArrow]': 'withArrow()',
	},
})
export class BoxComponent {
	readonly intl = input(...intlInputOptions(LU_BOX_TRANSLATIONS));

	/**
	 * Background theme of the box. Fancy themes highlight the box from the rest of the page.
	 * Defaults to white.
	 */
	readonly theme = input<BoxTheme>('white');

	/**
	 * The title of the box
	 */
	readonly heading = input<PortalContent>();

	/**
	 * Text displayed below the title
	 */
	readonly subtitle = input<PortalContent>();

	/**
	 * Define the aria level of the title. Defaults to 3.
	 */
	readonly hx = input(3, { transform: luNumberAttribute<BoxHx> });

	/**
	 * Icon displayed in a bubble next to the title. Not available with fancy themes.
	 */
	readonly icon = input<LuccaIcon>();

	/**
	 * Decorative bubble displayed on the right, based on the CDN image bubble number. Only available with fancy themes.
	 */
	readonly bubble = input<HighlightDataBubble | number>(undefined, { transform: luOptionalNumberAttribute });

	/**
	 * Decorative illustration displayed on the right. Only available with fancy themes.
	 * An URL can be applied for custom images
	 */
	readonly illustration = input<HighlightDataIllustration | string>();

	/**
	 * @deprecated use `theme="neutral"` instead
	 */
	readonly neutral = input(false, { transform: luBooleanAttribute });

	/**
	 * @deprecated the box is not interactive anymore
	 */
	readonly toggle = input(false, { transform: luBooleanAttribute });

	/**
	 * @deprecated the box is not interactive anymore
	 */
	readonly killable = input(false, { transform: luBooleanAttribute });

	/**
	 * @deprecated the box doesn't point to another element anymore
	 */
	readonly withArrow = input(false, { transform: luBooleanAttribute });

	/**
	 * @deprecated the box is not interactive anymore
	 */
	readonly killed = output();

	readonly isFancy = computed(() => this.theme().startsWith('fancy'));

	readonly bubbleIcon = computed(() => (this.isFancy() ? undefined : this.icon()));

	readonly bubbleSrc = computed(() => {
		const bubble = this.bubble();
		return this.isFancy() && bubble ? `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/${bubble}.svg` : null;
	});

	readonly illustrationSrc = computed(() => {
		const illustration = this.illustration();
		if (!this.isFancy() || !illustration) {
			return null;
		}
		return illustration.includes('/') ? illustration : `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/${illustration}.svg`;
	});
}
