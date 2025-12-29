import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-fancy-box',
	templateUrl: './fancy-box.component.html',
	styleUrl: './fancy-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'fancyBox',
		'[class.mod-S]': 'size() === "S"',
		'[style.--components-fancyBox-foreground]': 'foregroundStyle()',
		'[style.--components-fancyBox-background-left]': 'backgroundLeftStyle()',
		'[style.--components-fancyBox-background-right]': 'backgroundRightStyle()',
	},
})
export class FancyBoxComponent {
	/**
	 * foreground image (URL)
	 */
	readonly foreground = input<string>();

	/**
	 * Background left image (URL)
	 */
	readonly backgroundLeft = input.required<string>();

	/**
	 * Background right image (URL)
	 */
	readonly backgroundRight = input.required<string>();

	/**
	 * Which size should the callout be? Defaults to small
	 */
	readonly size = input<null | 'S'>(null);

	readonly foregroundStyle = computed(() => this.#buildUrl(this.foreground()));
	readonly backgroundLeftStyle = computed(() => this.#buildUrl(this.backgroundLeft()));
	readonly backgroundRightStyle = computed(() => this.#buildUrl(this.backgroundRight()));

	#buildUrl(text: string) {
		return text ? `url(${text})` : ``;
	}
}
