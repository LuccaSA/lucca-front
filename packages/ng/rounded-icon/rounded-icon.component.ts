import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-bubble-icon',
	templateUrl: './rounded-icon.component.html',
	styleUrl: './rounded-icon.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'roundedIcon',
		'[class]': 'paletteClass()',
		'[class.mod-S]': 'size() === "S"',
		'[class.mod-L]': 'size() === "L"',
	},
	imports: [IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundedIconComponent {
	readonly icon = input.required<LuccaIcon>();
	readonly alt = input<string | null>(null);
	readonly size = input<'S' | 'L' | ''>('');

	readonly palette = input<Palette | DecorativePalette>('product');
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
