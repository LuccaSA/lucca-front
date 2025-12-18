import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-icon',
	imports: [NgClass],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
	readonly icon = input.required<LuccaIcon>();

	readonly alt = input<string>();

	readonly size = input<'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>();

	readonly color = input<'primary' | 'secondary' | 'product' | 'error' | 'warning' | 'success' | 'light' | 'placeholder' | 'inherit'>('inherit');

	readonly AI = input(false, { transform: booleanAttribute });

	readonly iconClasses = computed(() => {
		const size = this.size();
		return {
			[`mod-${size}`]: !!size,
		};
	});
}
