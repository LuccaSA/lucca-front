import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuccaIcon } from '@lucca-front/icons';
import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-tag',
	templateUrl: './tag.component.html',
	styleUrl: './tag.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, RouterLink, LuTooltipModule],
})
export class TagComponent {
	/**
	 * Which text should the tag be? Defaults to medium
	 */
	readonly label = input.required<string>();

	/**
	 * Which size should the tag be? Defaults to medium
	 */
	readonly size = input<'S' | 'M' | 'L'>('M');

	/**
	 * Which palette should be used for the entire tag.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<Palette | DecorativePalette>('none');

	/**
	 * Should display be outlined?
	 */
	readonly outlined = input(false, { transform: booleanAttribute });

	/**
	 * For routerLink usage
	 */
	readonly link = input<string>();

	/**
	 * Which icon should we display in the tag if any?
	 * Defaults to no icon.
	 */
	readonly icon = input<LuccaIcon | null>(null);

	readonly withEllipsis = input(false, { transform: booleanAttribute });

	readonly AI = input(false, { transform: booleanAttribute });

	readonly tagClasses = computed(() => {
		const size = this.size();
		const palette = this.palette();
		return {
			[`mod-${size}`]: !!size,
			[`palette-${palette}`]: !this.AI() && !!palette,
		};
	});
}
