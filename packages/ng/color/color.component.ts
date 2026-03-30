import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ColorSize } from './color-type';

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
	readonly value = input<string | null>(null);
	readonly borderColor = input<string | null>(null);
	readonly size = input<ColorSize | null>(null);
	readonly hiddenName = input(false, { transform: booleanAttribute });
}
