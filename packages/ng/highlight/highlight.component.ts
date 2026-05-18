import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DecorativePalette, Palette } from '@lucca/prisme/core';

@Component({
	selector: 'lu-highlight',
	template: '<ng-content />',
	styleUrl: './highlight.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'strong',
		class: 'highlight',
		'[class]': 'paletteClass()',
	},
})
export class HighlightComponent {
	readonly palette = input<Palette | DecorativePalette>('product');
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
