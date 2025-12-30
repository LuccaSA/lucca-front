import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass, PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-highlight-data',
	templateUrl: './highlight-data.component.html',
	styleUrl: './highlight-data.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'highlightData',
		'[class.mod-light]': 'lightClass',
		'[class.mod-dark]': 'darkClass',
	},
	imports: [PortalDirective],
})
export class HighlightDataComponent {
	#luClass = inject(LuClass);

	/**
	 * The title of the highlight date
	 */
	readonly heading = input.required<PortalContent>();

	/**
	 * The content of the highlight date
	 */
	readonly value = input.required<PortalContent>();

	/**
	 * Add text below the content
	 */
	readonly subText = input<PortalContent>();

	/**
	 * Define a bubble style based on the CDN image bubble number
	 */
	readonly bubble = input<1 | 2 | 3 | 4 | number>();

	/**
	 * Define a specific them white light or dark. (White by default)
	 */
	readonly theme = input<'white' | 'light' | 'dark'>('white');

	/**
	 * Apply product name to illustration URL and CSS component palette
	 * This specific palette must be set up on config.scss
	 */
	readonly palette = input<'lucca' | 'cleemy' | 'timmi' | 'poplee' | 'coreHR' | 'pagga' | 'cc' | 'success' | 'warning' | 'critical' | string>('lucca');

	/**
	 * Main illustration
	 * An URL can be apply for custom images
	 */
	readonly illustration = input<
		'calculator' | 'calendar' | 'cleemy-card' | 'coffee' | 'headphone' | 'mail' | 'manifying-glass' | 'medallon' | 'piggy-bank' | 'polaroid-female' | 'polaroid-male' | 'polaroids' | string
	>();

	/**
	 * Which size should the highlight data be? XS to medium
	 */
	readonly size = input<'XS' | 'S' | 'M' | null>(null);

	/**
	 * Adjust layout to text value
	 */
	readonly valueFirst = input(false, { transform: booleanAttribute });

	/**
	 * Displayed in nested mode
	 */
	readonly nested = input(false, { transform: booleanAttribute });

	get lightClass() {
		return this.theme() === 'light';
	}

	get darkClass() {
		return this.theme() === 'dark';
	}

	readonly illustrationSrc = computed(() =>
		this.illustration().includes('/') ? this.illustration() : `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/${this.illustration()}.svg`,
	);

	readonly bubbleSrc = computed(() => `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/${this.palette()}/bubbles-${this.bubbleTheme()}-${this.bubble()}.svg`);

	readonly bubbleTheme = computed(() => (this.theme() === 'dark' ? 'dark' : 'light'));

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				'mod-valueFirst': this.valueFirst(),
				'mod-nested': this.nested(),
				[`palette-${this.palette()}`]: !!this.palette(),
			});
		});
	}
}
