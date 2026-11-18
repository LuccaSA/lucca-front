import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, luNullableNumberAttribute } from '@lucca-front/ng/core';
import { CardHeadingLevel, CardSize } from '../card.type';

@Component({
	selector: 'lu-card-wrapper',
	template: `<div class="card2Wrapper-list" role="list"><ng-content /></div>
		<ng-content select="[cardWrapperAction]" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'card2Wrapper',
		'[class.mod-grid]': 'grid()',
		'[class.mod-plain]': 'plain()',
		'[class.mod-S]': 'size() === "S"',
	},
})
export class CardWrapperComponent {
	/**
	 * Displays the cards in columns instead of stacking them
	 */
	readonly grid = input(false, { transform: luBooleanAttribute });

	/**
	 * Removes the background and the padding around the cards, e.g. for navigation to sub-features
	 */
	readonly plain = input(false, { transform: luBooleanAttribute });

	/**
	 * Heading level of every card title, overriding the one set on each card
	 */
	readonly headingLevel = input(null, { transform: luNullableNumberAttribute<CardHeadingLevel> });

	/**
	 * Size of every card, overriding the one set on each card
	 */
	readonly size = input<CardSize | null>(null);
}
