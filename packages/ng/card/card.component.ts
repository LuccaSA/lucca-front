import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { luNumberAttribute } from '@lucca-front/ng/core';
import { CardHeadingLevel, CardSize } from './card.type';
import { CardWrapperComponent } from './wrapper/card-wrapper.component';

/**
 * Several cards must be grouped in a `lu-card-wrapper`, which carries the list semantics.
 * Optional content must be wrapped in an `@if` (`@if (description) { {{ description }} }`): an empty interpolation still counts as content and keeps the space below the title.
 */
@Component({
	selector: 'lu-card',
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'card2',
		'[class.mod-S]': 'sizeValue() === "S"',
		'[attr.role]': 'wrapperRef ? "listitem" : null',
	},
})
export class CardComponent {
	protected readonly wrapperRef = inject(CardWrapperComponent, { optional: true });

	/**
	 * Heading level of the card title
	 */
	readonly headingLevel = input(3, { transform: luNumberAttribute<CardHeadingLevel> });

	/**
	 * Size of the card
	 */
	readonly size = input<CardSize | null>(null);

	protected readonly headingLevelValue = computed(() => this.wrapperRef?.headingLevel() ?? this.headingLevel());

	protected readonly sizeValue = computed(() => this.wrapperRef?.size() ?? this.size());
}
