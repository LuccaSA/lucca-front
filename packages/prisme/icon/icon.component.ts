import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { IconColor, IconSize } from './icon.type';
import type { LuccaIcon } from './icons';

@Component({
	selector: 'lu-icon, pr-icon',
	imports: [NgClass],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
	/**
	 * Defines icon to display
	 */
	readonly icon = input.required<LuccaIcon>();

	/**
	 * Information conveyed by the screen reader
	 */
	readonly alt = input<string>();

	/**
	 * Which size should the icon be? XXS to XXL
	 */
	readonly size = input<IconSize>();

	/**
	 * Changes the color of the icon (inherit by default)
	 */
	readonly color = input<IconColor>('inherit');

	/**
	 * Display icon in AI mode
	 */
	readonly AI = input(false, { transform: booleanAttribute });

	readonly iconClasses = computed(() => {
		const size = this.size();
		return {
			[`mod-${size}`]: !!size,
		};
	});
}
