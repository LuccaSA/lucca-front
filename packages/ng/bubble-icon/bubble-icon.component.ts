import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-bubble-icon',
	templateUrl: './bubble-icon.component.html',
	styleUrl: './bubble-icon.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'bubbleIcon',
		'[class]': 'paletteClass()',
		'[class.mod-left]': 'direction() === 1',
		'[class.mod-right]': 'direction() === 2',
		'[class.mod-top]': 'direction() === 3',
		'[class.mod-bottom]': 'direction() === 4',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-XS]': 'size() === "XS"',
		'[class.mod-L]': 'size() === "L"',
	},
	imports: [IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleIconComponent {
	readonly icon = input<LuccaIcon | null>(null);
	readonly alt = input<string | null>(null);
	readonly size = input<'XS' | 'S' | 'L' | ''>('');

	readonly palette = input<Palette | DecorativePalette>('product');
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));

	readonly bubbleDirection = input<'top' | 'bottom' | 'left' | 'right' | null>(null);

	readonly randomNumber = signal<number>(Math.floor(Math.random() * 4) + 1);

	readonly direction = computed(() => {
		switch (this.bubbleDirection()) {
			case 'left':
				return 1;
			case 'right':
				return 2;
			case 'top':
				return 3;
			case 'bottom':
				return 4;
			default:
				return this.randomNumber();
		}
	});
}
