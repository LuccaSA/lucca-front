import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-status-badge',
	templateUrl: './statusBadge.component.html',
	styleUrl: './statusBadge.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	imports: [LuTooltipModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'statusBadge',
	},
})
export class StatusBadgeComponent implements OnChanges {
	readonly #luClass = inject(LuClass);

	/**
	 * Truncates the text with an ellipsis and adds a tooltip when the label is too long
	 */
	readonly withEllipsis = input(false, { transform: booleanAttribute });

	/**
	 * Changes the text displayed by the status badge
	 */
	readonly label = input.required<string>();

	/**
	 * Changes the size of the status badge (Medium by default or L)
	 */
	readonly size = input<'L' | 'M'>('M');

	/**
	 * Applies a color palette to the status badge
	 */
	readonly palette = input<Palette | null>(null);

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette(), [`mod-${this.size()}`]: true });
	}
}
