import { ChangeDetectionStrategy, Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { HighlightSectionBubble, HighlightSectionBubblePosition, HighlightSectionIllustration, HighlightSectionPalette, HighlightSectionTheme } from './highlight-section.type';

/**
 * Bubble ornaments are shared with the highlight data CDN folder.
 */
const CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data';

/**
 * Illustrations have their own dedicated CDN folder.
 */
const ILLUSTRATION_CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section';

@Component({
	selector: 'lu-highlight-section',
	templateUrl: './highlight-section.component.html',
	styleUrl: './highlight-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'highlightSection',
		'[class.mod-light]': 'lightClass',
		'[class.mod-dark]': 'darkClass',
	},
})
export class HighlightSectionComponent {
	#luClass = inject(LuClass);

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
	readonly bubble = input<HighlightSectionBubble | number>();

	/**
	 * Which side(s) should the ornaments be displayed on? (Both by default)
	 */
	readonly bubblePosition = input<HighlightSectionBubblePosition>('both');

	/**
	 * Illustration displayed at the end of the content
	 * An URL can be apply for custom images
	 */
	readonly illustration = input<HighlightSectionIllustration | string>();

	get lightClass() {
		return this.theme() === 'light';
	}

	get darkClass() {
		return this.theme() === 'dark';
	}

	readonly bubbleTheme = computed(() => (this.theme() === 'dark' ? 'dark' : 'light'));

	readonly bubbleSrc = computed(() => `${CDN_PATH}/${this.palette()}/bubbles-${this.bubbleTheme()}-${this.bubble()}.svg`);

	readonly illustrationSrc = computed(() => {
		const illustration = this.illustration() ?? '';
		return illustration.includes('/') ? illustration : `${ILLUSTRATION_CDN_PATH}/${illustration}.svg`;
	});

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`palette-${this.palette()}`]: !!this.palette(),
			});
		});
	}
}
