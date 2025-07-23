import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuccaIcon } from '@lucca-front/icons';
import { DecorativePalette, LuClass, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-tag',
	standalone: true,
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, RouterLink],
	providers: [LuClass],
	host: {
		class: 'tag',
	},
})
export class TagComponent {
	#luClass = inject(LuClass);

	label = input.required<string>();

	/**
	 * Which size should the callout be? Defaults to medium
	 */
	size = input<'M' | 'L'>('M');

	/**
	 * Which palette should be used for the entire callout.
	 * Defaults to none (inherits parent palette)
	 */
	palette = input<Palette | DecorativePalette>('none');

	/**
	 * Should display be outlined?
	 */
	outlined = input(false, { transform: booleanAttribute });

	/**
	 * For routerLink usage
	 */
	link = input<string | null>(null);

	/**
	 * Which icon should we display in the callout if any?
	 * Defaults to no icon.
	 */
	icon = input<LuccaIcon | null>(null);

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				[`palette-${this.palette()}`]: !!this.palette(),
				'mod-outlined': this.outlined(),
			});
		});
	}
}
