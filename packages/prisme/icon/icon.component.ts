import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { ICON_ALIASES } from './icon-aliases';
import { IconSpriteService } from './icon-sprite.service';
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
	#iconSpriteService = inject(IconSpriteService);

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
	 * Changes the color of the icon (inherits from context by default)
	 */
	readonly color = input<IconColor>();

	/**
	 * Display icon in AI mode
	 */
	readonly AI = input<boolean, boolean | `${boolean}` | ''>(false, { transform: booleanAttribute });

	readonly iconClasses = computed(() => {
		const size = this.size();
		const color = this.color();
		return {
			[`mod-${size}`]: !!size,
			[`icon-color-${color}`]: !!color && color !== 'inherit',
		};
	});

	readonly spriteIconId = computed(() => {
		const icon = this.icon();
		const canonicalIcon = ICON_ALIASES[icon] ?? icon;
		return canonicalIcon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
	});

	constructor() {
		this.#iconSpriteService.ensureSpriteLoaded();
	}
}
