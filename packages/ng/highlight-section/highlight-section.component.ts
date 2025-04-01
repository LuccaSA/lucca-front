import { ChangeDetectionStrategy, Component, computed, effect, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-highlight-section',
	standalone: true,
	templateUrl: './highlight-section.component.html',
	styleUrl: './highlight-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'highlightSection',
	},
})
export class HighlightSectionComponent {
	#luClass = inject(LuClass);

	bubbleBottom = input<1 | 2 | 3 | 4 | number>();
	bubbleTop = input<1 | 2 | 3 | 4 | number>();
	palette = input<'lucca' | 'cleemy' | 'timmi' | 'poplee' | 'coreHR' | 'pagga' | 'cc' | 'success' | 'warning' | 'critical' | string>('lucca');
	size = input<'XS' | 'S' | 'M' | null>(null);
	theme = input<'white' | 'light' | 'dark'>('white');

	/**
	 * Apply product name to illustration URL and CSS component palette
	 * This specific palette must be set up in config.scss.
	 */

	bubbleTopSrc = computed(() => {
		return `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/${this.palette()}/bubbles-${this.bubbleTheme()}-${this.bubbleTop()}.svg`;
	});

	bubbleBottomSrc = computed(() => {
		return `https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/${this.palette()}/bubbles-${this.bubbleTheme()}-${this.bubbleBottom()}.svg`;
	});

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

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				[`palette-${this.palette()}`]: !!this.palette(),
			});
		});
	}
}
