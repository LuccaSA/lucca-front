import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '../safe-content/safe-external-svg.pipe';
import { FancyBoxBackgroundEndStart, FancyBoxBackgroundStartEnd, FancyBoxForegroundEndStart, FancyBoxForegroundStartEnd, FancyBoxSize } from './fancy-box.type';

@Component({
	selector: 'lu-fancy-box',
	templateUrl: './fancy-box.component.html',
	styleUrl: './fancy-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'fancyBox',
		'[class]': 'paletteClass()',
		'[class.mod-S]': 'size() === "S"',
	},
})
export class FancyBoxComponent {
	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/fancy-box/';
	readonly extension = '.svg';

	/**
	 * @deprecated use `foregroundStartEnd` instead
	 */
	readonly foreground = input<string | null>(null);
	/**
	 * @deprecated use `backgroundEndStart` instead
	 */
	readonly backgroundLeft = input<FancyBoxBackgroundEndStart | string | null>(null);
	/**
	 * @deprecated use `backgroundStartEnd` instead
	 */
	readonly backgroundRight = input<FancyBoxBackgroundStartEnd | string | null>(null);

	readonly foregroundStartEnd = input<FancyBoxForegroundStartEnd | string | null>(null);
	readonly foregroundEndStart = input<FancyBoxForegroundEndStart | string | null>(null);
	readonly backgroundEndStart = input<FancyBoxBackgroundEndStart | string | null>(null);
	readonly backgroundStartEnd = input<FancyBoxBackgroundStartEnd | string | null>(null);

	readonly size = input<FancyBoxSize | null>(null);

	/**
	 * Palette utilisée pour les couleurs des bulles de fond.
	 */
	readonly palette = input<string>('product');
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));

	readonly backgroundEndStartUrl = computed(() => this.#buildUrl('background-end-start', this.backgroundEndStart() ?? this.backgroundLeft() ?? 'bubbles'));
	readonly backgroundStartEndUrl = computed(() => this.#buildUrl('background-start-end', this.backgroundStartEnd() ?? this.backgroundRight() ?? 'bubbles'));
	readonly foregroundStartEndUrl = computed(() => this.#buildUrl('foreground-start-end', this.foregroundStartEnd() ?? this.foreground()));
	readonly foregroundEndStartUrl = computed(() => this.#buildUrl('foreground-end-start', this.foregroundEndStart()));

	#buildUrl(prefix: string, value: string | null): string | null {
		if (value === null) {
			return null;
		}
		if (value.startsWith('https://') || value.startsWith('/')) {
			return value;
		}
		return `${this.domain}${this.path}${prefix}-${value}${this.extension}`;
	}
}
