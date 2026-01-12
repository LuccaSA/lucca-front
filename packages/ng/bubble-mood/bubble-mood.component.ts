import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

@Component({
	selector: 'lu-bubble-mood',
	templateUrl: './bubble-mood.component.html',
	styleUrl: './bubble-mood.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
})
export class BubbleMoodComponent {
	readonly mood = input<'angry' | 'bored' | 'happy' | 'joyful' | 'moody' | 'sad' | 'shoked' | 'sly' | 'smirking' | 'surprised'>('happy');
	readonly palette = input<Palette | DecorativePalette>('product');
	readonly size = input<'XS' | 'S' | 'L' | ''>('');
	readonly moodUrl = computed(() => `https://cdn.lucca.fr/transverse/prisme/visuals/bubble-mood/${this.mood()}.svg`);

	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
