import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { ColorSize } from './color.type';

@Component({
	selector: 'lu-color',
	templateUrl: './color.component.html',
	styleUrl: './color.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'color',
		'[class.mod-L]': 'size() === "L"',
		'[class.mod-XL]': 'size() === "XL"',
	},
})
export class ColorComponent {
	/**
	 * CSS color displayed in the color swatch
	 */
	readonly value = input<string | null>(null);

	/**
	 * CSS color of the swatch border. Defaults to no visible border (transparent)
	 */
	readonly borderColor = input<string | null>(null);

	/**
	 * Which size should the color be? Defaults to M (no value)
	 */
	readonly size = input<ColorSize | null>(null);

	/**
	 * Visually hides the color name (projected content), keeping it available to screen readers
	 */
	readonly hiddenName = input(false, { transform: luBooleanAttribute });
}
