import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { DecorativePalette, Palette, ProductPalette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { BubbleIconSize } from './bubble-icon.type';

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
		'[class.mod-XS]': 'size() === "XS"',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-L]': 'size() === "L"',
	},
	imports: [IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleIconComponent {
	/**
	 * Glyph of the icon
	 */
	readonly icon = input.required<LuccaIcon>();
	/**
	 * Alternative text of the icon, read by screen readers
	 */
	readonly alt = input<string | null>(null);
	/**
	 * Size of the component
	 */
	readonly size = input<BubbleIconSize>('M');

	/**
	 * Color palette applied to the component
	 */
	readonly palette = input<Palette | DecorativePalette | ProductPalette>('product');
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));

	/**
	 * Direction of the bubble, random by default
	 */
	readonly bubbleDirection = input<'top' | 'bottom' | 'left' | 'right' | 'random'>('random');

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
