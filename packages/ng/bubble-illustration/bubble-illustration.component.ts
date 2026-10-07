import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DecorativePalette, luBooleanAttribute, Palette } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { BubbleIllustration } from './bubble-illustration';
import { BubbleIllustrationSize } from './bubble-illustration.type';

@Component({
	selector: 'lu-bubble-illustration',
	templateUrl: './bubble-illustration.component.html',
	styleUrl: './bubble-illustration.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
})
export class BubbleIllustrationComponent {
	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/bubble-illustration/';
	readonly extension = '.svg';

	/**
	 * Name of the illustration, or URL of a custom SVG (starting with `https://` or `/`)
	 */
	readonly illustration = input.required<BubbleIllustration | string>();

	/**
	 * Color palette applied to the component
	 */
	readonly palette = input<Palette | DecorativePalette>('product');

	/**
	 * Size of the component
	 */
	readonly size = input<BubbleIllustrationSize>('M');

	/**
	 * Adds an action icon (+) to the illustration
	 */
	readonly action = input(false, { transform: luBooleanAttribute });

	readonly illustrationUrl = computed(() => {
		if (this.illustration().startsWith('https://') || this.illustration().startsWith('/')) {
			return this.illustration();
		}
		return `${this.domain}${this.path}${this.illustration()}${this.extension}`;
	});

	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
