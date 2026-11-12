import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, linkedSignal, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, luBooleanAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_FAVORITE_TRANSLATIONS } from './favorite.translate';
import { FavoriteButtonSize } from './favorite.type';

@Component({
	selector: 'lu-favorite',
	templateUrl: './favorite.component.html',
	styleUrl: './favorite.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, LuTooltipTriggerDirective],
	host: {
		class: 'favorite',
		'[class.mod-S]': "size() === 'S'",
		'[class.mod-XS]': "size() === 'XS'",
		'[class.is-animated]': 'animated()',
		'(animationend)': 'onAnimationEnd($event)',
		'(animationcancel)': 'onAnimationEnd($event)',
	},
})
export class FavoriteComponent {
	/**
	 * Whether the item is in the favorites. Supports two-way binding with `[(favorite)]`
	 */
	readonly favorite = input(false, { transform: luBooleanAttribute });

	/**
	 * Emits the new state when the user toggles the favorite
	 */
	readonly favoriteChange = output<boolean>();

	/**
	 * Which size should the component be? Defaults to M
	 */
	readonly size = input<FavoriteButtonSize>('M');

	/**
	 * Prevents the user from toggling the favorite, while keeping the button focusable and its tooltip available
	 */
	readonly disabled = input(false, { transform: luBooleanAttribute });

	/**
	 * Overrides the default translations, for instance to name the item in the accessible label
	 */
	readonly intl = input(...intlInputOptions(LU_FAVORITE_TRANSLATIONS));

	protected readonly isFavorite = linkedSignal(() => this.favorite());

	// Holds the previous state on toggle, so that the closing tooltip keeps its label while fading out
	readonly #frozenTooltipFavorite = signal<boolean | null>(null);

	protected readonly tooltipFavorite = computed(() => this.#frozenTooltipFavorite() ?? this.isFavorite());

	protected readonly animated = signal(false);

	private readonly tooltip = viewChild.required(LuTooltipTriggerDirective);

	#releaseTooltipTimeout?: ReturnType<typeof setTimeout>;

	constructor() {
		inject(DestroyRef).onDestroy(() => clearTimeout(this.#releaseTooltipTimeout));
	}

	protected toggle(event: MouseEvent): void {
		if (this.disabled()) {
			// aria-disabled keeps the button focusable for its tooltip, so the click has to be blocked like a native disabled button
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		this.#frozenTooltipFavorite.set(this.isFavorite());
		this.isFavorite.update((favorite) => !favorite);
		this.favoriteChange.emit(this.isFavorite());
		this.animated.set(this.isFavorite());
		// The label would switch to the opposite action under the pointer right after the click, which reads like a failure
		this.tooltip().requestClose();
		// Hovering the tooltip panel during the close delay cancels the closing: the label must not stay frozen then
		clearTimeout(this.#releaseTooltipTimeout);
		this.#releaseTooltipTimeout = setTimeout(() => this.syncTooltip(), this.tooltip().tooltipLeaveDelay());
	}

	protected syncTooltip(): void {
		this.#frozenTooltipFavorite.set(null);
	}

	protected onAnimationEnd(event: AnimationEvent): void {
		// The sparks outlast the bounce of the star, so they mark the end of the animation.
		// A cancelled animation (hidden favorite) ends it too, otherwise it would replay once displayed again
		if (event.animationName === 'favoriteSparks') {
			this.animated.set(false);
		}
	}
}
