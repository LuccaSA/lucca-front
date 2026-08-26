import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { HighlightSectionBubble, HighlightSectionIllustration, HighlightSectionPalette, HighlightSectionTheme } from './highlight-section.type';

const ILLUSTRATION_CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section';

@Component({
	selector: 'lu-highlight-section',
	templateUrl: './highlight-section.component.html',
	styleUrl: './highlight-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'highlightSection',
		'[class.mod-light]': 'this.theme() === "light"',
		'[class.mod-dark]': 'this.theme() === "dark"',
		'[class]': '"palette-" + palette()',
	},
})
export class HighlightSectionComponent {
	/**
	 * Define a specific theme white light or dark. (White by default)
	 */
	readonly theme = input<HighlightSectionTheme>('white');

	/**
	 * Apply product name to ornaments URL and CSS component palette
	 * This specific palette must be set up on config.scss
	 */
	readonly palette = input<HighlightSectionPalette | string>('lucca');

	/**
	 * Define an ornament style based on the CDN image bubble number.
	 * Ornaments are hidden when this input is not set.
	 */
	readonly bubbleStart = input<HighlightSectionBubble | number>();
	readonly bubbleEnd = input<HighlightSectionBubble | number>();

	/**
	 * Illustration displayed at the end of the content
	 * An URL can be apply for custom images
	 */
	readonly illustration = input<HighlightSectionIllustration | string>();

	readonly bubbleStartSrc = computed(() => `${ILLUSTRATION_CDN_PATH}/bubbles-${this.bubbleStart()}.svg`);
	readonly bubbleEndSrc = computed(() => `${ILLUSTRATION_CDN_PATH}/bubbles-${this.bubbleEnd()}.svg`);

	readonly illustrationSrc = computed(() => {
		const illustration = this.illustration() ?? '';
		return illustration.includes('/') ? illustration : `${ILLUSTRATION_CDN_PATH}/${illustration}.svg`;
	});
}
