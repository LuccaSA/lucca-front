import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DecorativePalette, Palette } from '@lucca/prisme/core';

@Component({
	selector: 'lu-highlight-text',
	template: '<ng-content />',
	styleUrl: './highlight-text.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'strong',
		class: 'highlightText',
		'[class]': 'paletteClass()',
	},
})
export class HighlightTextComponent {
	readonly palette = input<Palette | DecorativePalette>('product');
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
