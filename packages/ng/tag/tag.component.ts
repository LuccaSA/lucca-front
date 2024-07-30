import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-tag',
	standalone: true,
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, NgClass, RouterLink],
})
export class TagComponent {
	@Input({ required: true })
	label: string;

	@Input()
	/**
	 * Which size should the callout be? Defaults to medium
	 */
	size: 'M' | 'S' = 'M';

	@Input()
	/**
	 * Which palette should be used for the entire callout.
	 * Defaults to none (inherits parent palette)
	 */
	palette: Palette = 'none';

	@Input({ transform: booleanAttribute })
	/**
	 * Should display be outlined?
	 */
	outlined = false;

	@Input()
	/**
	 * For routerLink usage
	 */
	link: string;

	@Input()
	/**
	 * Which icon should we display in the callout if any?
	 * Defaults to no icon.
	 */
	icon: LuccaIcon;

	get tagClasses() {
		return {
			[`mod-${this.size}`]: !!this.size,
			[`palette-${this.palette}`]: !!this.palette,
		};
	}
}
