import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass, PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-highlight-data',
	standalone: true,
	templateUrl: './highlight-data.component.html',
	styleUrls: ['./highlight-data.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'highlightData',
	},
	imports: [PortalDirective],
})
export class HighlightDataComponent {
	#luClass = inject(LuClass);
	heading = input.required<PortalContent>();
	value = input.required<PortalContent>();
	subText = input<PortalContent>();
	bubble = input<1 | 2 | 3 | 4 | number>();
	bubbleSrc = computed(() => {
		return `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/${this.palette()}/bubbles-${this.bubbleTheme()}-${this.bubble()}.svg`;
	});
	theme = input<'white' | 'light' | 'dark'>('white');
	/**
	 * Apply product name to illustration URL and CSS component palette
	 * This specific palette must be set up on config.scss
	 */
	palette = input<'lucca' | 'cleemy' | 'timmi' | 'poplee' | 'coreHR' | 'pagga' | 'cc' | 'success' | 'warning' | 'critical' | string>('lucca');

	bubbleTheme = computed(() => {
		if (this.theme() === 'dark') {
			return 'dark';
		}
		return 'light';
	});

	@HostBinding('class.mod-light')
	get lightClass() {
		return this.theme() === 'light';
	}

	@HostBinding('class.mod-dark')
	get darkClass() {
		return this.theme() === 'dark';
	}

	/**
	 * Main illustration
	 * An URL can be apply for custom images
	 */
	illustration = input<
		'calculator' | 'calendar' | 'cleemy-card' | 'coffee' | 'headphone' | 'mail' | 'manifying-glass' | 'medallon' | 'piggy-bank' | 'polaroid-female' | 'polaroid-male' | 'polaroids' | string
	>();
	illustrationSrc = computed(() => {
		if (this.illustration().includes('/')) {
			return this.illustration();
		}
		return `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/${this.illustration()}.svg`;
	});
	size = input<'XS' | 'S' | 'M' | null>(null);
	/**
	 * Adjust layout to text value
	 */
	valueFirst = input(false, { transform: booleanAttribute });

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				'mod-valueFirst': this.valueFirst(),
				[`palette-${this.palette()}`]: !!this.palette(),
			});
		});
	}
}
