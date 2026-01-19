import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { BubbleIllustration } from './bubble-illustration';

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

	readonly illustration = input.required<BubbleIllustration>();

	readonly palette = input<Palette | DecorativePalette>('product');
	readonly size = input<'S' | 'L' | ''>('');
	readonly action = input(false, { transform: booleanAttribute });

	readonly illustrationUrl = computed(() => `${this.domain}${this.path}${this.illustration()}${this.extension}`);

	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
